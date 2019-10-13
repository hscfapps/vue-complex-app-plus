// eslint-disable-next-line import/no-extraneous-dependencies
const nu = require('@upman/node-utils');

const sourceConfig = require('./source-app/babel.config');

sourceConfig.plugins = sourceConfig.plugins || [];

sourceConfig.plugins.push(...[
  '@upman/babel-plugin-source-page',
  ['@upman/babel-plugin-transform-import-source', {
    mapper: {
      vue: nu.resolve('src/proxy-vue.js'),
    },
  }],
  ['@upman/babel-plugin-transform-export-default', {
    target: nu.posixPath(nu.resolve('source-app/src/store/options.js')),
    transform: nu.resolve('src/transform-store-options.js'),
  }],
]);

module.exports = sourceConfig;
