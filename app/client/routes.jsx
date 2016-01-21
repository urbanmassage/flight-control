import App from './Containers/App';

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [{
      path: 'transactions',
      getComponent(location, cb) {
        requireEnsure([], () => {
          const Transactions = require('./Containers/Transactions').default;
          cb(null, Transactions);
        });
      },
      childRoutes: [{
        name: 'transaction',
        path: ':transaction_id',
        getComponent(location, cb) {
          requireEnsure([], () => {
            const Transaction = require('./Containers/Transaction').default;
            cb(null, Transaction);
          });
        },
      }],
    }],
  },
];

export default routes;
