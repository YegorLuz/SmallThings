const routes = [
    {
        reqUrl: '/store/:storeId',
        destPath: '/store',
    },
    {
        reqUrl: '/store/:storeId/category/:categoryId',
        destPath: '/category',
    },
    {
        reqUrl: '/category/:categoryId',
        destPath: '/category',
    },
    {
        reqUrl: '/category/:categoryId/product/:productId',
        destPath: '/product',
    }
];

module.exports = routes;