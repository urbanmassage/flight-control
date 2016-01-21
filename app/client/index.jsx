import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import {browserHistory, Router, match} from 'react-router';

window.React = React;

import 'normalize.css';

// TODO - display loading indicator

match({routes, location}, (error, redirectLocation, renderProps) => {
  const store = require('./store')(window.initialStoreData);
  render((
    <Provider store={store}>
      <Router {...renderProps} history={browserHistory} />
    </Provider>
  ), document.getElementById('app'));
});
