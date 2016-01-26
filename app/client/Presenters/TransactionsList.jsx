import * as React from 'react';
import Transaction from './Transaction';

const TransactionsList = ({transactions, active, onSelect}) => {
  if (!transactions || !transactions.length) {
    return <p>No items were found.</p>;
  }
  return (
    <div>{
      transactions.map(transaction => (
        <Transaction
          key={transaction._id}
          transaction={transaction}
          onClick={transaction => onSelect(transaction)}
          isActive={transaction._id === active}
          />
      ))
    }</div>
  );
};
TransactionsList.propTypes = {
  transactions: React.PropTypes.arrayOf(React.PropTypes.object),
  active: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
};

export default TransactionsList;
