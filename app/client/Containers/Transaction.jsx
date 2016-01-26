import * as React from 'react';
import SingleTransaction from '../Presenters/SingleTransaction';
import {connect} from 'react-redux';
import fetchTransaction from '../actions/transaction';
import fetchTransactionChildren from '../actions/transaction-children';
import DataWrapper from '../Presenters/DataWrapper';
import {routeActions} from 'react-router-redux';

class Transaction extends React.Component {
  componentDidMount() {
    const {transaction_id} = this.props.params;
    this.props.fetchTransaction(transaction_id);
    this.props.fetchTransactionChildren(transaction_id);
  }
  componentWillReceiveProps(nextProps) {
    const {transaction_id} = nextProps.params;
    if (transaction_id !== this.props.params.transaction_id) {
      this.props.fetchTransaction(transaction_id);
      this.props.fetchTransactionChildren(transaction_id);
    }
  }
  render() {
    const {transaction} = this.props;
    return (
      <DataWrapper state={transaction}>{this.renderTransaction()}</DataWrapper>
    );
  }
  renderTransaction() {
    const {transaction, onSelect} = this.props;
    if (!transaction || !transaction.data || !transaction.data.transaction) return null;

    const transactionChildren = this.props.transactionChildren && this.props.transactionChildren.data && this.props.transactionChildren.data.children;
    return (
      <SingleTransaction transaction={transaction.data.transaction} transactionChildren={transactionChildren} onSelect={onSelect} />
    );
  }
  static propTypes = {
    fetchTransaction: React.PropTypes.func.isRequired,
    fetchTransactionChildren: React.PropTypes.func.isRequired,
    transaction: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
    }),
    transactionChildren: React.PropTypes.shape({
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
    onSelect: ({_id}) => routeActions.push('/transactions/' + _id),
  }, ({transaction, transactionChildren}, dispatchProps, ownProps) => {
    const {transaction_id} = ownProps.params;
    return Object.assign({}, ownProps, dispatchProps, {
      transaction: transaction[transaction_id],
      transactionChildren: transactionChildren[transaction_id],
    });
  })(Transaction);
