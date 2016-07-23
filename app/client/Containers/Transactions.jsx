import * as React from 'react';
import {connect} from 'react-redux';
import fetchTransactions from '../actions/transactions';
import Paper from 'material-ui/lib/paper';
import DataWrapper from '../Presenters/DataWrapper';
import TransactionsList from '../Presenters/TransactionsList';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import {routeActions} from 'react-router-redux';
import JSON5 from 'json5';

class Transactions extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.fetchTransactions(nextProps);
    }
  }

  fetchTransactions(props = this.props) {
    let {json, ...search} = props.search;
    if (json) json = JSON5.parse(json);
    Object.keys(search).forEach(key => {
      if (search[key] == null) delete search[key];
    });
    this.props.fetchTransactions(Object.assign({}, search, json));
  }

  render() {
    const {data} = this.props.transactions;
    const {params} = this.props;

    const onSelect = ({id}) => {
      const {pushRoute} = this.props;
      pushRoute('/transactions/' + id);
    };

    const transactions = (
      <TransactionsList
        transactions={data && data.transactions}
        active={params && params.transaction_id}
        onSelect={onSelect} />
    );

    return (
      <DataWrapper state={this.props.transactions}>
        {transactions}
      </DataWrapper>
    );
  }

  static propTypes = {
    search: React.PropTypes.object.isRequired,
    fetchTransactions: React.PropTypes.func.isRequired,
    pushRoute: React.PropTypes.func.isRequired,
    transactions: React.PropTypes.object.isRequired,
  };
}

export default
  connect(({transactions, search}) => ({transactions, search}), {
    fetchTransactions,
    pushRoute: routeActions.push,
  })(Transactions);
