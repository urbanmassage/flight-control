import App from './Containers/App';

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [{
      path: '/test',
      component: require('./Containers/Home').default,
      // TODO - we get checksum mismatch error here. Find a solution
      // getComponent(location, cb) {
      //   requireEnsure([], () => {
      //     const Home =require('./Containers/Home').default;
      //     cb(null, Home);
      //   });
      // },
    }],
  },
];

export default routes;
