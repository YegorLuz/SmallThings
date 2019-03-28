const express = require('express');
const next = require('next');
const nextConfig = require('./config.js');

const app = next(nextConfig);
const port = process.env.PORT || 3000;

app.prepare()
    .then(() => {
        const server = express();

        server.use('/assets', express.static('./client/assets'));

        server.get('/', (req, res) => {
            return app.render(req, res, '/');
        });

        server.get('/about', (req, res) => {
            return app.render(req, res, '/about', { slug: req.params.slug });
        });

        server.get('*', (req, res) => {
            return app.render(req, res, '/', req.query);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
