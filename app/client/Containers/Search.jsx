import * as React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import {routeActions} from 'redux-simple-router';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import updateSearch from '../actions/update-search';

@connect(({search}) => ({search}))
class Search extends React.Component {
  state = {};
  linkState(key) {
    return {
      value: this.state[key],
      requestChange: value => this.setState({[key]: value}),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search.relativeTime !== this.props.relativeTime) {
      this.setState({relativeTime: nextProps.search.relativeTime});
    }
    if (nextProps.search.type !== this.props.type) {
      this.setState({type: nextProps.search.type});
    }
    if (nextProps.search.system !== this.props.system) {
      this.setState({system: nextProps.search.system});
    }
    if (nextProps.search.json !== this.props.json) {
      this.setState({json: nextProps.search.json});
    }
  }

  onTransactionSubmit(evt) {
    evt.preventDefault();
    const {dispatch, location} = this.props;
    const transactionId = this.refs.transactionId.getValue();
    dispatch(routeActions.push('/transactions/' + transactionId));
  }
  onSearchSubmit(evt) {
    evt.preventDefault();
    const {relativeTime, type, system, json} = this.refs;
    this.onChangeSearch({
      type: type.getValue() || null,
      system: system.getValue() || null,
      json: json.getValue() || null,
    });
    evt.target.blur();
  }
  onChangeSearch(payload) {
    const {dispatch} = this.props;
    dispatch(updateSearch(payload));
  }
  render() {
    const {search, doSearch} = this.props;
    return (
      <Paper zDepth={1} style={{padding: 20}}>
        <h2>Search</h2>
        <form onSubmit={evt => this.onTransactionSubmit(evt)} className="row">
          <div className="col-xs-8">
            <TextField ref="transactionId" name="transactionId" hintText="Transaction ID" style={{width: '100%'}} />
          </div>
          <div className="col-xs-4">
            <RaisedButton label="Get" primary={true} onClick={evt => this.onTransactionSubmit(evt)} />
          </div>
        </form>
        <form method="GET" action="/transactions" ref="searchForm" onSubmit={evt => this.onSearchSubmit(evt)}>
          <div>
            <SelectField name="relativeTime" ref="relativeTime"
              floatingLabelText="Time range"
              value={search.relativeTime}
              onChange={(event, index, relativeTime) => this.onChangeSearch({relativeTime})}
              >{
              ['-30s', '-1m', '-2m', '-5m', '-10m', '-15m', '-30m', '-45m', '-1h', '-2h', '-6h', '-12h', '-1d', '-2d', '-7d']
                .map(v => (
                  <MenuItem key={v} value={v} primaryText={v} />
                ))
            }</SelectField>
          </div>
          <div>
            <TextField valueLink={this.linkState('type')} name="type" ref="type" floatingLabelText="Type" onEnterKeyDown={evt => this.onSearchSubmit(evt)} />
          </div>
          <div>
            <TextField valueLink={this.linkState('system')} name="system" ref="system" floatingLabelText="System" onEnterKeyDown={evt => this.onSearchSubmit(evt)} />
          </div>
          <div>
            <TextField valueLink={this.linkState('json')} multiLine name="json" ref="json" floatingLabelText="JSON" />
          </div>
          <div>
            <RaisedButton label="Find" primary={true}  onClick={evt => this.onSearchSubmit(evt)}/>
          </div>
        </form>
      </Paper>
    );
  }
}

export default Search;
