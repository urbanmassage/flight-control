import * as React from 'react';
import Transaction from './Transaction';

const TransactionsList = ({transactions, onSelect}) => {
  if (!transactions || !transactions.length) {
    return <p>No items were found.</p>;
  }
  return (
    <div>{
      transactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} onClick={() => onSelect(transaction)} />
      ))
    }</div>
  );
};
TransactionsList.propTypes = {
  transactions: React.PropTypes.arrayOf(React.PropTypes.object),
  onSelect: React.PropTypes.func.isRequired,
};

export default TransactionsList;
