import * as React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

const Transaction = ({transaction}) => {
  let color = Colors.blue500;
  let icon = <span />;
  let title = transaction.type;

  if (transaction.type === 'express') {
    icon = <span style={{fontSize: 15}}>{transaction.data.response.status}</span>;

    if (transaction.data.response.status < 300) {
      color = Colors.green500;
    } else if (transaction.data.response.status >= 500) {
      color = Colors.red500;
    } else if (transaction.data.response.status >= 400) {
      color = Colors.yellow500;
    }

    title = transaction.data.request.method + ' ' + transaction.data.request.route;
  } else if (transaction.type.toLowerCase() === 'rabbitr') {
    icon = <span style={{fontSize: 15}}>{transaction.data.status}</span>;

    if (transaction.data.status === 'ack') {
      color = Colors.green500;
    } else if (transaction.data.status === 'reject') {
      color = Colors.yellow500;
    } else if (transaction.data.status === 'error') {
      color = Colors.red500;
    }

    title = transaction.data.topic;
  }
  return (
    <ListItem primaryText={title} secondaryText={transaction.system}
      leftAvatar={<Avatar icon={icon} backgroundColor={color} />} />
  );
};
Transaction.propTypes = {
  transaction: React.PropTypes.object.isRequired,
};

export default Transaction;
