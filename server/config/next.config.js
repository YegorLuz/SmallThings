const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer');
const path = require('path');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

const { ANALYZE } = process.env;
// const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins = config.plugins || [];

    switch (ANALYZE) {
      case 'BUNDLES':
        config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'server',
              analyzerPort: isServer ? 8888 : 8889,
              openAnalyzer: true,
            }),
        );
        break;
      case 'SIZE':
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'));
        break;
      default:
        break;
    }

    config.resolve = {
      ...config.resolve,
      extensions: ['.mjs', '.js', '.json'],
    };

    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
  // Will be available on both server and client
  publicRuntimeConfig : {
    staticFolder: '../client/assets',
    //tokenSecret: `${process.env.DG_API_KEY}-${process.env.DG_ORGANIZATION_ID}`,
    //defaultStore: process.env.DEFAULT_STORE_ID,
    //autoAddressKey: process.env.AUTOADDRESS_KEY,
    //clusterName: process.env.CLUSTER,
    //buildDate: process.env.BUILD_DATE,
    //buildId: process.env.BUILD_NUMBER,
  },

  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 24 * 60 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    //pagesBufferLength: 2,
  },
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  staticFolder: '../client/assets',
  crossOrigin: 'anonymous',
};

module.exports = nextConfig;
