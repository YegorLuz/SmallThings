const express = require('express');
const DataBase = require('./db');
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const BodyParser = require('body-parser');
const { useAuth } = require('./auth');
const { authHandler, registrationHandler } = require('./handlers/user');
const { homePageHandler, loginPageHandler, registrationPageHandler } = require('./handlers/pages');

if (!global.fetch) {
    global.fetch = fetch;
}

DataBase.init().catch(err => console.log(err));

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(useAuth(DataBase));

server.post('/api/auth', authHandler(DataBase));
server.post('/api/registration', registrationHandler(DataBase));

server.get('/api/home-page', homePageHandler(DataBase));
server.get('/api/login-page', loginPageHandler(DataBase));
server.get('/api/registration-page', registrationPageHandler(DataBase));

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

server.listen(3300, () => {
    console.log('+++Express Server is Running!!!');
});