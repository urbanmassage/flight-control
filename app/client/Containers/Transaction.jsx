import * as React from 'react';
import TransactionPresenter from '../Presenters/Transaction';
import {connect} from 'react-redux';
import fetchTransaction from '../actions/transaction';
import fetchTransactionChildren from '../actions/transaction-children';
import DataWrapper from '../Presenters/DataWrapper';

class Transaction extends React.Component {
  componentDidMount() {
    const {transaction_id} = this.props.params;
    this.props.fetchTransaction(transaction_id);
    this.props.fetchTransactionChildren(transaction_id);
  }
  render() {
    console.log(this.props);
    const {transaction} = this.props;
    return (
      <DataWrapper state={transaction}>{this.renderTransaction()}</DataWrapper>
    );
  }
  renderTransaction() {
    const {transaction} = this.props;
    if (!transaction) return null;
    return (
      <TransactionPresenter transaction={transaction} onClick={null} />
    );
  }
  static propTypes = {
    fetchTransaction: React.PropTypes.func.isRequired,
    fetchTransactionChildren: React.PropTypes.func.isRequired,
    transaction: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
    }),
    childTransactions: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
    }),
    params: React.PropTypes.shape({
      transaction_id: React.PropTypes.string.isRequired,
    }).isRequired,
  };
}

export default
  connect(({transaction, transactionChildren}) => ({transaction, transactionChildren}), {
    fetchTransaction,
    fetchTransactionChildren,
  }, ({transaction, transactionChildren}, dispatchProps, ownProps) => {
    const {transaction_id} = ownProps.params;
    return Object.assign({}, ownProps, dispatchProps, {
      transaction: transaction[transaction_id],
      childTransactions: transactionChildren[transaction_id],
    });
  })(Transaction);
