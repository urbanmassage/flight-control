import App from './Containers/App';

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [{
      path: 'transactions',
      getComponents(location, cb) {
        requireEnsure([], () => {
          const Search = require('./Containers/Search').default;
          const Transactions = require('./Containers/Transactions').default;
          cb(null, {sidebar: Search, main: Transactions});
        });
      },
      childRoutes: [{
        path: ':transaction_id',
        getComponents(location, cb) {
          requireEnsure([], () => {
            const Transactions = require('./Containers/Transactions').default;
            const Transaction = require('./Containers/Transaction').default;
            cb(null, {sidebar: Transactions, main: Transaction});
          });
        },
      }],
    }],
  },
];

export default routes;
