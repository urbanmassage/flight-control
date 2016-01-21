const fetchMiddleware = ({dispatch, getState}) =>
  next =>
    action =>
      typeof action === 'object' && action.isFetch ?
        (() => {
          const {type, stateKey, request, url} = action;
          const state = getState()[stateKey];

          // Don't fetch twice.
          if (state && state.status === 'loading') return null;

          dispatch({type, status: 'loading', request, url});

          return fetch(url, request).then(response => response.json().then(data => {
            if (response.status >= 400) throw Object.assign(new Error('Got an error from the server'), data);
            dispatch({type, status: 'success', data, request, url});
          })).catch(error => {
            dispatch({type, status: 'error', error, request, url});
          });
        })() :
        next(action);

export default fetchMiddleware;
