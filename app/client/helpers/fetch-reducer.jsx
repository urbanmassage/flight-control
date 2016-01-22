export default function fetchReducer(actionType, initialData) {
  const initialState = {status: 'waiting', data: initialData, error: null};
  return function(state = initialState, action) {
    if (action.type === actionType) {
      const {status, data, error, request, url, args} = action;
      switch (status) {
        case 'loading':
          return Object.assign({}, state, {status, request, url, args});
        case 'success':
          return Object.assign({}, state, {status, request, url, args, data});
        case 'error':
          return Object.assign({}, state, {status, request, url, args, error});
        default:
          console.warn(new Error('Unknown fetch status: ' + status));
      }
    }
    return state;
  };
}
