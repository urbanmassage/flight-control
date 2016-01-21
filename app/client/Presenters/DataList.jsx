import * as React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import DataWrapper from './DataWrapper';

const DataList = (props) => {
  const {dataKey, renderItem, state} = props;
  const {data} = state;

  let children;
  if (data && data[dataKey]) {
    if (data[dataKey].length) {
      children = (
        <List>
          {data[dataKey].map(renderItem).map(itemProps => <ListItem {...itemProps} />)}
        </List>
      );
    } else {
      children = <p style={{padding: 20}}>No items were found.</p>;
    }
  }

  return <DataWrapper state={state}>{children}</DataWrapper>;
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
