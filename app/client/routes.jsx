import App from './Containers/App';

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [{
      path: '/test',
      getComponent(location, cb) {
        requireEnsure([], () => {
          const Home = require('./Containers/Home').default;
          cb(null, Home);
        });
      },
    }],
  },
];

export default routes;
