require('es6-promise').polyfill();
require('isomorphic-fetch');

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from './helpers/fetch-middleware';

let finalCreateStore = createStore;

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./Containers/DevTools').default;
  finalCreateStore = compose(
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  )(finalCreateStore);
}

finalCreateStore = applyMiddleware(thunk, fetchMiddleware)(finalCreateStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(require('./reducers'), initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
