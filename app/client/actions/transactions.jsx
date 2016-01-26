export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

function fetchTransactions(search) {
  return {
    type: FETCH_TRANSACTIONS,
    isFetch: true,
    requestKey: 'transactions-search',
    url: '/api/search/transaction',
    request: {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(search),
    },
  };
}
export default fetchTransactions;
