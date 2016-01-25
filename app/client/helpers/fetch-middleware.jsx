/**
 * A map for storing loading status by `requestKey`.
 */
const isLoadingMap = {};

/**
 * A middleware that accepts `fetch` actions and converts them to async actions.
 *
 * To use, just dispatch an action with `isFetch: true, requestKey: [KEY]` and `url: [URL]`.
 * Request key is used to guarantee that no request gets loaded twice at the same time.
 *
 * The middleware will dispatch multiple actions with the same `type` and different `status`.
 * Dispatched statuses are either `loading`, `success` or `error`. Use this middleware with a
 *   fetch-reducer.
 */
const fetchMiddleware = ({dispatch, getState}) =>
  next =>
    action =>
      typeof action === 'object' && action.isFetch ?
        (() => {
          const {type, requestKey, request, url, args} = action;
          if (!requestKey) {
            throw new Error('Missing `requestKey` in a fetch action');
          }

          if (isLoadingMap[requestKey]) {
            return; // don't fetch the same request twice
          }

          dispatch({type, status: 'loading', request, url, args});
          isLoadingMap[requestKey] = true;

          return fetch(url, request).then(response => response.json().then(data => {
            if (response.status >= 400) throw Object.assign(new Error('Got an error from the server'), data);
            isLoadingMap[requestKey] = false;
            dispatch({type, status: 'success', data, request, url, args});
          })).catch(error => {
            isLoadingMap[requestKey] = false;
            dispatch({type, status: 'error', error, request, url, args});
          });
        })() :
        next(action);

export default fetchMiddleware;
