const nu = require('@upman/node-utils');
const SoucePageMapPlugin = require('@upman/webpack-plugin-souce-page-map');
const sourceVueConfig = require('./source-app/vue.config');

const originChainWebpack = sourceVueConfig.chainWebpack;
sourceVueConfig.chainWebpack = (config) => {
  if (originChainWebpack) {
    originChainWebpack(config);
  }

  // 修改原有配置
  config.resolve.alias
    .set('@', nu.resolve('source-app/src'))
    .set('el-style@', nu.resolve('source-app/el-theme'))
    .set('asset@', nu.resolve('source-app/src/asset'))
    .set('api@', nu.resolve('source-app/src/api'))
    .set('com@', nu.resolve('source-app/src/common'))
    .set('comp@', nu.resolve('source-app/src/component'))
    .set('conf@', nu.resolve('source-app/src/conf'))
    .set('config@', nu.resolve('source-app/src/conf/config'))
    .set('mx@', nu.resolve('source-app/src/conf/config'))
    .set('dire@', nu.resolve('source-app/src/directive'))
    .set('page@', nu.resolve('source-app/src/page'))
    .set('_@', nu.resolve('source-app/uipublice'));

  config
    .plugin('upman-scan-meta')
    .tap((_args) => {
      const args = _args;
      args[0].include.push('source-app');
      return args;
    });

  config
    .plugin('upman-auto-router')
    .tap((_args) => {
      const args = _args;
      args[0].page = 'source-app/src/page';
      args[0].routerDir = 'source-app/src/conf/router';
      return args;
    });

  // 额外添加
  config.module.rule('vue')
    .use('record-source-page')
    .loader('@upman/record-source-page-loader')
    .before('vue-loader');
  config.module.rule('vue')
    .use('record-tags')
    .loader('@upman/record-tags-loader')
    .before('vue-loader');
  config.plugin('source-page-map')
    .use(SoucePageMapPlugin, [{
      routersPath: 'src/routes.js',
      sourceRoutersPath: 'source-app/src/conf/router/routes.js',
    }]);
};

sourceVueConfig.pluginOptions.staticPath = 'source-app/static';
sourceVueConfig.pluginOptions.staticPath = 'source-app/html';

module.exports = sourceVueConfig;
