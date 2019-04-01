const express = require('express');
const DataBase = require('./db');
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const BodyParser = require('body-parser');

if (!global.fetch) {
    global.fetch = fetch;
}

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

DataBase.init().catch(err => console.log(err));

server.get('/api/products', async (request, response) => {
    try {
        const products = await DataBase.getProducts();
        response.send({ data: products });
    } catch (error) {
        response.status(200).send(error);
    }
});

server.get('/api/products/:id', async (request, response) => {
    const id = (request.params || {}).id;
    try {
        const product = await DataBase.getProduct(id);
        response.send({ data: product, id });
    } catch (error) {
        response.status(200).send(error);
    }
});

server.listen(3300, () => {
    console.log('+++Express Server is Running!!!');
});