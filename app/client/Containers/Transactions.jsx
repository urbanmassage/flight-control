import * as React from 'react';
import {connect} from 'react-redux';
import fetchTransactions from '../actions/transactions';
import Paper from 'material-ui/lib/paper';
import DataWrapper from '../Presenters/DataWrapper';
import TransactionsList from '../Presenters/TransactionsList';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }
  render() {
    const {data} = this.props.transactions;

    const transactions = <TransactionsList transactions={data && data.transactions} onSelect={() => {}} />;

    return (
      <DataWrapper state={this.props.transactions}>
        {transactions}
      </DataWrapper>
    );
  }
}

export default
  connect(({transactions}) => ({transactions}), {fetchTransactions})(Transactions);
