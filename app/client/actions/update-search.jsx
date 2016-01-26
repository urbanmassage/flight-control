export const UPDATE_SEARCH = 'UPDATE_SEARCH';

function updateSearch(payload) {
  return {
    type: UPDATE_SEARCH,
    payload,
  };
}
export default updateSearch;
