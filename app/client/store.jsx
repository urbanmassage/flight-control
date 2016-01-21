import {createStore, compose} from 'redux';

let finalCreateStore = createStore;

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./Containers/DevTools').default;
  finalCreateStore = compose(
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  )(createStore);
}

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
