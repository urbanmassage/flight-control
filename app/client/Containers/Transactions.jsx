import * as React from 'react';
import {connect} from 'react-redux';
import fetchTransactions from '../actions/transactions';
import Paper from 'material-ui/lib/paper';
import DataList from '../Presenters/DataList';

@connect(({transactions}) => ({transactions}), {fetchTransactions})
class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }
  render() {
    const transactions = (
      <DataList state={this.props.transactions} dataKey="transactions"
        renderItem={transaction => ({ key: transaction.id, primaryText: transaction.name })} />
    );

    let singleTransaction;
    if (this.props.children) {
      singleTransaction = this.props.children;
    } else {
      singleTransaction = <p>Select a transaction from the right to view it.</p>;
    }

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <Paper zDepth={1}>
            {transactions}
          </Paper>
        </div>
        <div className="col-sm-6 col-md-8">
          {singleTransaction}
        </div>
      </div>
    );
  }
}

export default Transactions;
