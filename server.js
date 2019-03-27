const express = require('express');
const next = require('next');
const DataBase = require('./db/index');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3000;

app.prepare()
    .then(() => {
        const server = express();
        DataBase.init()
            .then(data => {
                /*
                DataBase.createProduct({
                    id: 1,
                    title: 'Product 1',
                    description: 'Product 1',
                    price: 0.78,
                })
                    .then(prod => prod);
                    */
            })
            .catch(err => console.log(err));

        server.use('/assets', express.static('assets'));

        server.get('/', async (req, res) => {
            const product = await DataBase.getProduct(1);
            res.product = product;
            return app.render(req, res, '/', { product });
        });

        server.get('/about', (req, res) => {
            return app.render(req, res, '/about', { slug: req.params.slug });
        });

        /*
        server.get('/reviews', (req, res) => {
            return app.render(req, res, '/');
        });

        server.get('/reviews/:slug', (req, res) => {
            const queryParams = {
                slug: req.params.slug,
                type: req.params.type
            };
            return app.render(req, res, '/reviews/details', queryParams);
        });

        server.get('/records', (req, res) => {
            return app.render(req, res, '/records');
        });

        server.get('/records/:slug', (req, res) => {
            const queryParams = {
                slug: req.params.slug,
                type: req.params.type
            };
            return app.render(req, res, '/records/details', queryParams);
        });
        */

        server.get('*', (req, res) => {
            return app.render(req, res, '/', req.query);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
