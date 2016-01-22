import {combineReducers} from 'redux';
import title from './title';
import transactions from './transactions';
import transactionChildren from './transaction-children';
import {routeReducer as routing} from 'redux-simple-router';

const rootReducer = combineReducers({
  routing,
  title,
  transactions,
  transactionChildren,
});

module.exports = rootReducer;
