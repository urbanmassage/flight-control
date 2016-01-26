import {combineReducers} from 'redux';
import title from './title';
import transaction from './transaction';
import transactions from './transactions';
import transactionChildren from './transaction-children';
import {routeReducer as routing} from 'react-router-redux';
import search from './search';

const rootReducer = combineReducers({
  routing,
  title,
  transaction,
  transactions,
  transactionChildren,
  search,
});

module.exports = rootReducer;
