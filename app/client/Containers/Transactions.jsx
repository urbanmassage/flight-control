import * as React from 'react';
import {connect} from 'react-redux';
import fetchTransactions from '../actions/transactions';
import Paper from 'material-ui/lib/paper';
import DataWrapper from '../Presenters/DataWrapper';
import TransactionsList from '../Presenters/TransactionsList';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

@connect(({transactions}) => ({transactions}), {fetchTransactions})
class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }
  render() {
    const {data} = this.props.transactions;

    const transactions = <TransactionsList transactions={data && data.transactions} />;

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <Paper zDepth={1} style={{padding: 20}}>
            <h2>Search</h2>
            <form method="get" action="/transactions/" onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(routeActions.replace('/transactions/' + evt.target.transactionId.value));
            }} className="row">
              <div className="col-xs-8">
                <TextField name="transactionId" hintText="Transaction ID" style={{width: '100%'}} />
              </div>
              <div className="col-xs-4">
                <RaisedButton label="Find" primary={true} />
              </div>
            </form>
          </Paper>
        </div>
        <div className="col-sm-6 col-md-8">
          <DataWrapper state={this.props.transactions}>
            {transactions}
          </DataWrapper>
        </div>
      </div>
    );
  }
}

export default Transactions;
