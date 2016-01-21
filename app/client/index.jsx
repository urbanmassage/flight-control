import * as React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';

window.React = React;

import 'normalize.css';

const store = require('./store')(window.initialStoreData);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
