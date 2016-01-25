import * as React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import ErrorMessage from './ErrorMessage';

class DataWrapper extends React.Component {
  render() {
    if (!this.props.state) {
      return <p>Waiting</p>;
    }

    const {data, status, error} = this.props.state;
    if (status === 'error') {
      return <ErrorMessage message={error.message} />;
    } else if (data) {
      return this.props.children;
    } else if (status === 'loading') {
      return <div style={{padding: 20, textAlign: 'center'}}><CircularProgress mode="indeterminate" /></div>;
    }
    return <p>Waiting</p>;
  }
  static propTypes = {
    children: React.PropTypes.element,
    state: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.object,
    }),
  };
}

export default DataWrapper;
