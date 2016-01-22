import * as React from 'react';
import TransactionPresenter from '../Presenters/Transaction';
import {connect} from 'react-redux';
import fetchTransactionChildren from '../actions/transaction-children';

@connect(({transactionChildren}) => ({transactionChildren}), {
  fetchTransactionChildren,
}, (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, dispatchProps, {
    childTransactions: stateProps[ownProps.transaction.id],
  })
)
class Transaction extends React.Component {
  render() {
    const {transaction, fetchTransactionChildren} = this.props;
    return (
      <TransactionPresenter transaction={transaction} onClick={({id}) => fetchTransactionChildren(id)} />
    );
  }
}
Transaction.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  fetchTransactionChildren: React.PropTypes.func.isRequired,
  childTransactions: {
    state: React.PropTypes.string.isRequired,
  },
};

export default Transaction;
