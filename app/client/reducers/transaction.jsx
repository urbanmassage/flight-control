import fetchReducer from '../helpers/fetch-reducer';
import {FETCH_TRANSACTION} from '../actions/transaction';

export default (state = {}, action) => {
  if (action.type !== FETCH_TRANSACTION) {
    return state;
  }
  const key = action.args.transactionId;
  return Object.assign({}, state, {
    [key]: fetchReducer(FETCH_TRANSACTION)(state[key], action),
  });
};
