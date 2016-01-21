export default function fetchReducer(actionType, stateKey, initialData) {
  const initialState = {status: 'waiting', data: initialData, error: null};
  return function(state = initialState, action) {
    if (action.type === actionType) {
      const {status, data, error, request, url} = action;
      switch (status) {
        case 'loading':
          return Object.assign({}, state, {status, request, url});
        case 'success':
          return Object.assign({}, state, {status, request, url, data});
        case 'error':
          return Object.assign({}, state, {status, request, url, error});
        default:
          console.warn(new Error('Unknown fetch status: ' + status));
      }
    }
    return state;
  };
}
