import * as React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import {routeActions} from 'react-router-redux';

@connect()
class TransactionIDBar extends React.Component{
  render() {
    const {dispatch} = this.props;
    return (
      <form method="get" action="/transactions/" onSubmit={(evt) => {
        evt.preventDefault();
        dispatch(routeActions.replace('/transactions/' + evt.target.transactionId.value));
      }}>
        <TextField name="transactionId" hintText="Transaction ID" />
      </form>
    );
  }
}

export default TransactionIDBar;
