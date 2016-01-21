import * as React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const DataList = (props) => {
  const {data, status, error} = props.state;
  const {dataKey, renderItem} = props;

  if (status === 'error') {
    return <p style={{padding: 20}}>{error.message}</p>;
  } else if (data && data[dataKey]) {
    if (data[dataKey].length) {
      return (
        <List>
          {data[dataKey].map(renderItem).map(itemProps => <ListItem {...itemProps} />)}
        </List>
      );
    }
    return <p style={{padding: 20}}>No items were found.</p>;
  } else if (status === 'loading') {
    return <div style={{padding: 20, textAlign: 'center'}}><CircularProgress mode="indeterminate" /></div>;
  }
  return <p>Waiting</p>;
};
DataList.propTypes = {
  dataKey: React.PropTypes.string.isRequired,
  state: React.PropTypes.shape({
    status: React.PropTypes.string.isRequired,
    error: React.PropTypes.object,
    data: React.PropTypes.object,
  }).isRequired,
  nonFoundMessage: React.PropTypes.string,
  renderItem: React.PropTypes.func.isRequired,
};

export default DataList;
