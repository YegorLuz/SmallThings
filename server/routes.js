const routes = require('next-routes')();

routes.add('products', 'products/:id', 'products');

module.exports = routes;