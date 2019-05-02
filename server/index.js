const express = require('express');
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const nextConfig = require('./config.js');
const useAuth = require('./useAuth');
const routes = require('./routes');

dotenv.config();

const app = next(nextConfig);
const port = parseInt(process.env.PORT, 10) || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const isProd = !isDev;

const customHost = process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const handle = app.getRequestHandler();

const publicEnvFilename = 'public.env';

try {
    if (fs.existsSync(path.resolve(__dirname, publicEnvFilename))) {
        const publicEnv = dotenv.parse(fs.readFileSync(path.resolve(__dirname, publicEnvFilename)));
        Object.keys(publicEnv).forEach(key => {
            if (!process.env[key]) {
                process.env[key] = publicEnv[key];
            }
        });
    }
} catch (err) {
    // silence is golden
}

app.prepare()
    .then(() => {
        const server = express();

        server.use('/assets', express.static('./client/assets'));
        server.use(cookieParser());

        if (isProd) {
            server.use(compression({ threshold: 0 }));
        }

        const corsMiddleware = cors({
            origin: prettyHost.indexOf('http') !== -1 ? prettyHost : `http://${prettyHost}`,
            credentials: true,
            preflightContinue: false,
        });

        server.use(corsMiddleware);
        server.options(corsMiddleware);

        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        server.get(`/favicon.ico`, (req, res) => app.serveStatic(req, res, path.resolve('../client/assets/icons/favicon.ico')));

        server.get(`/manifest.json`, (req, res) => app.serveStatic(req, res, path.resolve('../client/assets/manifest.json')));

        //server.use(useAuth);

        routes.forEach(({ reqUrl, destPath }) => {
            server.get(reqUrl, (req, res) => {
                return app.render(req, res, destPath, req.params);
            });
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, host, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
