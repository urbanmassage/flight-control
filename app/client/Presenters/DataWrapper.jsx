import * as React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

class DataWrapper extends React.Component {
  render() {
    const {data, status, error} = this.props.state;
    if (status === 'error') {
      return <p style={{padding: 20}}>{error.message}</p>;
    } else if (data) {
      return this.props.children;
    } else if (status === 'loading') {
      return <div style={{padding: 20, textAlign: 'center'}}><CircularProgress mode="indeterminate" /></div>;
    }
    return <p>Waiting</p>;
  }
}
DataWrapper.propTypes = {
  children: React.PropTypes.element,
  state: React.PropTypes.shape({
    status: React.PropTypes.string.isRequired,
    error: React.PropTypes.object,
    data: React.PropTypes.object,
  }).isRequired,
};

export default DataWrapper;
