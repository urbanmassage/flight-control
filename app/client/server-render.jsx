import * as React from 'react';
import {renderToString} from 'react-dom/server';

import App from './App';
import {Provider} from 'react-redux';

/* eslint-disable no-sync */
import {readFileSync} from 'fs';
const template = readFileSync(__dirname + '/index.html', 'utf8');
/* eslint-enable no-sync */

function renderApp(req, res, next) {
  try {
    const store = require('./store')();

    global.navigator = { // Required for material-ui
      userAgent: req.headers['user-agent'],
    };
    const rendered = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const state = store.getState();

    let page = template
      .replace('<!-- TITLE -->', state.title)
      .replace('<!-- CONTENT -->', rendered)
      .replace('"-- STORES --"', JSON.stringify(state));

    if (process.env.HOT) {
      page = page.replace(/<link rel="stylesheet"[^>]*>/, '');
    }

    res.send(page);
  } catch (err) { next(err); }
}

module.exports = renderApp;
