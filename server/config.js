const config = require('./config/next.config.js');

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  dir: './client',
  quiet: false,
  config,
};
