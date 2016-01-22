export const FETCH_TRANSACTION_CHILDREN = 'FETCH_TRANSACTION_CHILDREN';

function fetchTransactionChildren(transactionId) {
  return {
    type: FETCH_TRANSACTION_CHILDREN,
    isFetch: true,
    url: '/transaction/' + transactionId + '/children',
    args: {transactionId},
    request: {
      method: 'GET',
    },
  };
}
export default fetchTransactionChildren;
