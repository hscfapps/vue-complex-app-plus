
/* transform-import-source-disable */
import Vue from 'vue';
import Router from 'vue-router';
// 这里可以切换不同的路由配置列表来体验不同的页面定制
import routes from './routes';
import mergeRoutes from './utils/merge-routes';

export default class MockVue {
  constructor(_options) {
    const options = _options;
    if (options && options.router) {
      const oldRouter = options.router;
      const router = new Router({
        ...oldRouter.options,
        routes: mergeRoutes(oldRouter.options.routes, routes),
      });
      options.router = router;
    }
    return new Vue(options);
  }
}

MockVue.config = Vue.config;

MockVue.version = Vue.version;

[
  'extend', 'nextTick', 'set', 'delete', 'directive', 'filter',
  'component', 'use', 'mixin', 'compile', 'observable', 'createAPI',
].forEach((api) => {
  MockVue[api] = (...args) => {
    Vue[api](...args);
  };
});
