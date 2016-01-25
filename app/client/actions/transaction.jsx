export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';

function fetchTransaction(transactionId) {
  return {
    type: FETCH_TRANSACTION,
    isFetch: true,
    requestKey: 'transaction-' + transactionId,
    url: '/transaction/' + transactionId,
    args: {transactionId},
    request: {
      method: 'GET',
    },
  };
}
export default fetchTransaction;
