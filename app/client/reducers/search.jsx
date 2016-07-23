import {UPDATE_SEARCH} from '../actions/update-search';
import {LOAD_SEARCH} from '../actions/load-search';

const KEY = 'search';

function set(value) {
  if (typeof localStorage !== 'undefined') {
    if (value) {
      localStorage.setItem(KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(KEY);
    }
  }
  return value;
}

function get(_default = null) {
  if (typeof localStorage === 'undefined') { return _default; }
  const value = localStorage.getItem(KEY);
  if (!value) return _default;
  return JSON.parse(value);
}

const DEFAULT = {
  relativeTime: '-30s',
  json: `{
  parent: null
}`,
};

function searchReducer(state = {}, action) {
  switch (action.type) {
  case UPDATE_SEARCH:
    return set(Object.assign({}, state, action.payload));
  case LOAD_SEARCH:
    return get(DEFAULT);
  }
  return state;
}
export default searchReducer;
