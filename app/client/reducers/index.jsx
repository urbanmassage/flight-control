import {combineReducers} from 'redux';
import title from './title';
import transactions from './transactions';
import {routeReducer as routing} from 'redux-simple-router';

const rootReducer = combineReducers({
  routing,
  title,
  transactions,
});

module.exports = rootReducer;
