const nu = require('@upman/node-utils');
const SoucePageMapPlugin = require('@upman/webpack-plugin-souce-page-map');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourceVueConfig = require('./source-app/vue.config');

const originChainWebpack = sourceVueConfig.chainWebpack;

sourceVueConfig.chainWebpack = (config) => {
  if (originChainWebpack) {
    originChainWebpack(config);
  }

  config.mode('development');
  config.optimization.minimize(false);

  config.resolve.alias
    .set('@', nu.resolve('source-app/src'))
    .set('source@', nu.resolve('source-app'));

  config.plugin('source-page-map')
    .use(SoucePageMapPlugin, [{
      routersPath: 'src/routes.js',
      sourceRoutersPath: 'source-app/src/routes.js',
    }]);
  config.module.rule('vue')
    .use('record-source-page')
    .loader('@upman/record-source-page-loader')
    .before('vue-loader');
  config.module.rule('vue')
    .use('record-tags')
    .loader('@upman/record-tags-loader')
    .before('vue-loader');
  config
    .plugin('html')
    .tap((_args) => {
      const args = _args;
      if (args[0]) {
        args[0].template = nu.resolve('source-app/public/index.html');
      }
      return args;
    });
  // 由于改变了html插件的参数， 会导致copy-webpack-plugin失效
  config.plugins.delete('copy');
  config
    .plugin('copy')
    .use(CopyWebpackPlugin, [[{
      from: nu.resolve('source-app/public'),
      to: nu.resolve('dist'),
      toType: 'dir',
      ignore: ['.DS_Store'],
    }]]);
};

module.exports = sourceVueConfig;
