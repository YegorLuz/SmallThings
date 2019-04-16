const routes = require('next-routes')();

routes.add('products', 'products/:id', 'products');
routes.add('store', 'store/:storeId/:category', 'store');
routes.add('catalog', 'catalog/:category', 'catalog');

module.exports = routes;