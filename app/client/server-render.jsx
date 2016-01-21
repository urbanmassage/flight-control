import * as React from 'react';
import {renderToString} from 'react-dom/server';

import App from './App';

/* eslint-disable no-sync */
import {readFileSync} from 'fs';
const template = readFileSync(__dirname + '/index.html', 'utf8');
/* eslint-enable no-sync */

function renderApp(req, res, next) {
  try {
    const store = require('./store')();

    const rendered = renderToString(
      <App state={store.getState()} dispatch={() => null}/>
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
