import * as React from 'react';
import {renderToString} from 'react-dom/server';

// Polyfill webpack code splitting
global.requireEnsure = function(modules, callback) { callback(); };

import {Provider} from 'react-redux';
import routes from './routes';
import {match, RoutingContext} from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import {applyMiddleware} from 'redux';
import {syncHistory} from 'react-router-redux';

/* eslint-disable no-sync */
import {readFileSync} from 'fs';
const template = readFileSync(__dirname + '/index.html', 'utf8');
/* eslint-enable no-sync */

function renderApp(req, res, next) {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      try {
        const history = createMemoryHistory(req.url);
        const reduxRouterMiddleware = syncHistory(history);

        const store = applyMiddleware(reduxRouterMiddleware)(require('./store'))();

        global.navigator = { // Required for material-ui
          userAgent: req.headers['user-agent'],
        };
        const rendered = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
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
    } else {
      next();
    }
  });
}

module.exports = renderApp;
