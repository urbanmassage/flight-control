import fetchReducer from '../helpers/fetch-reducer';
import {FETCH_TRANSACTION_CHILDREN} from '../actions/transaction-children';

export default (state = {}, action) => {
  if (action.type !== FETCH_TRANSACTION_CHILDREN) {
    return state;
  }
  const key = action.args.transactionId;
  return Object.assign({}, state, {
    [key]: fetchReducer(FETCH_TRANSACTION_CHILDREN)(state[key], action),
  });
};
