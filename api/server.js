const express = require('express');
const DataBase = require('./db');
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const BodyParser = require('body-parser');
const colorPalette = require('./data/colorPalette');
const { useAuth } = require('./auth');

if (!global.fetch) {
    global.fetch = fetch;
}

DataBase.init().catch(err => console.log(err));

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(useAuth(DataBase));

server.get('/api/company-info', async (request, response) => {
    const { customerId = null } = request.body || {};
    let colors = colorPalette.index;
    let companyInfo = {
        name: 'Ukrainian Product Cluster',
        slogan: 'Шукаю &bull; знаходжу &bull; доставляю',
        logo: '../../assets/logos/small-things.png',
    };
    if (customerId !== null) {
        colors = colorPalette[customerId];
    }

    response.send({ colorPalette: colors, companyInfo });
});

server.get('/api/category-list', async (request, response) => {
    try {
        const categories = await DataBase.getCategories();
        response.send({ categories });
    } catch (error) {
        response.status(404).end(error);
    }
});

server.get('/api/menu', async (request, response) => {
    try {
        const menu = await DataBase.getPages();
        console.log(menu);
        response.send({ menu });
    } catch (error) {
        response.status(404).end(error);
    }
});

server.post('*', async (request, response) => {
    const urlParts = request.url.split('/');
    if (urlParts[2] === 'applications' && urlParts[4] === 'auth') {
        const { client_secret } = request.body;

        if (client_secret && client_secret === 'test1') {
            const access_token = 'kuku';
            response.send({ data: { access_token } });
        } else {
            response.status(403).end({ status: 403, message: 'Forbidden' });
        }
    }
});

server.get('/api/products', async (request, response) => {
    const { id = null, storeId = null, categoryId = null } = (request.data || {});
    try {
        const params = {};
        if (id !== null) params._id = id;
        if (storeId !== null) params.store = storeId;
        if (categoryId !== null) params.category = categoryId;

        const products = await DataBase.getProducts(params);
        response.send({ products });
    } catch (error) {
        response.status(404).end({ status: 404, message: 'error' });
    }
});

/*
server.get('/api/products/', async (request, response) => {
    const id = (request.data || {}).id;
    try {
        const product = await DataBase.getProduct(id);
        response.send({data: product, id});
    } catch (error) {
        response.status(200).send(error);
    }
});
*/

server.listen(3300, () => {
    console.log('+++Express Server is Running!!!');
});