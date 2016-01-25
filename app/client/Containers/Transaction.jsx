import * as React from 'react';
import TransactionPresenter from '../Presenters/Transaction';
import {connect} from 'react-redux';
import fetchTransactionChildren from '../actions/transaction-children';

class Transaction extends React.Component {
  render() {
    console.log(this.props);
    const {transaction, fetchTransactionChildren} = this.props;
    return (
      <TransactionPresenter transaction={transaction} onClick={({id}) => fetchTransactionChildren(id)} />
    );
  }
  static propTypes = {
    fetchTransactionChildren: React.PropTypes.func.isRequired,
    childTransactions: {
      state: React.PropTypes.string.isRequired,
    },
  };
}

export default
  connect(({transactionChildren}) => ({transactionChildren}), {
    fetchTransactionChildren,
  }, (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, ownProps, dispatchProps, {
      // childTransactions: stateProps[ownProps.transaction.id],
    })
  )(Transaction);
