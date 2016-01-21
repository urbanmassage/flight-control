import * as React from 'react';
import {connect} from 'react-redux';
import fetchTransactions from '../actions/transactions';

@connect(null, {fetchTransactions})
class Transactions extends React.Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }
  render() {
    return (
      <div>
        <p>Home sweet home.</p>
        {this.props.children}
      </div>
    );
  }
}

export default Transactions;
