export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

function fetchTransactions() {
  return {
    type: FETCH_TRANSACTIONS,
    isFetch: true,
    requestKey: 'transactions-search',
    url: '/search/transaction',
    request: {
      method: 'POST',
      body: JSON.stringify({
        parent: null,
        relativeTime: '-60s',
      }),
    },
  };
}
export default fetchTransactions;
