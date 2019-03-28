const express = require('express');
const graphqlHTTP = require('express-graphql');
const DataBase = require('./db');
const schema = require('./graphql/schema/products.js');

const server = express();
DataBase.init().catch(err => console.log(err));

server.listen(3300, () => {
    console.log('+++Express Server is Running!!!');
});

server.use('/api', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.get('/api/products', (req, res) => {
    res.send({ data: [] });
});

server.get('/api/products/:id?', (req, res) => {
    const id = (req.params || {}).id;
    res.send({ data: { id } });
});

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});