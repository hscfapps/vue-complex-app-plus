function mergeRoute(routes1, routes2) {
  const routes2Map = routes2.reduce((_map, route) => {
    const map = _map;
    map[route.path] = route;
    return map;
  }, {});
  const routes = routes1.reduce((list, route1) => {
    const route2 = routes2Map[route1.path];
    if (route2) {
      delete routes2Map[route1.path];
      let children;
      if (route1.children && route2.children) {
        children = mergeRoute(route1.children, route2.children);
      }
      const router = {
        ...route1,
        ...route2,
      };
      if (children) {
        router.children = children;
      }
      list.push(router);
      return list;
    }
    list.push(route1);
    return list;
  }, []);
  routes2.forEach((route) => {
    if (routes2Map[route.path]) {
      routes.push(route);
    }
  });
  return routes;
}

export default (...routersSet) => routersSet
  .reduce((routes, currentRoutes) => mergeRoute(routes, currentRoutes), []);
