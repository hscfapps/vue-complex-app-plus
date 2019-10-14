export default [{
  path: '/mkt/index',
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "index" */ './page/index.vue'),
  }],
}];
