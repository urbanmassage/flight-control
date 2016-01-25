import * as React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import {routeActions} from 'redux-simple-router';

@connect()
class Search extends React.Component {
  render() {
    const {dispatch} = this.props;
    return (
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
    );
  }
}

export default Search;
