import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import {browserHistory, Router} from 'react-router'

window.React = React;

import 'normalize.css';

const store = require('./store')(window.initialStoreData);

render((
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
), document.getElementById('app'));
