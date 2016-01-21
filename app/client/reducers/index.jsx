import {combineReducers} from 'redux';
import title from './title';
import {routeReducer as routing} from 'redux-simple-router';

const rootReducer = combineReducers({
  routing,
  title,
});

module.exports = rootReducer;
