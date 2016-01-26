import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import {Router, match} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {applyMiddleware} from 'redux';
import {syncHistory} from 'react-router-redux';

require('react-tap-event-plugin')();

window.React = React;

import './index.scss';
import 'normalize.css';
import 'flexboxgrid';

const browserHistory = createBrowserHistory();

// TODO - display loading indicator

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const {NODE_ENV} = process.env;

match({routes, location}, (error, redirectLocation, renderProps) => {
  const store = applyMiddleware(reduxRouterMiddleware)(require('./store'))(window.initialStoreData);

  if (NODE_ENV === 'development') {
    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays(store);
  }

  render((
    <Provider store={store}>
      <Router {...renderProps} history={browserHistory} />
    </Provider>
  ), document.getElementById('app'));
});
