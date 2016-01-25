import * as React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

const smallAvatarSize = 30;
const smallPadding = 20;

const smallStyle = {padding: smallPadding + 'px ' + smallPadding + 'px ' + (smallAvatarSize + smallPadding * 2) + 'px'};
const smallDataStyle = {width: '50px'};
const smallAvatarStyle = {};

const Transaction = ({transaction, isSmall, onClick}) => {
  let color = Colors.blue500;
  let icon = <span />;
  let title = transaction.type;

  const iconFontSize = isSmall ? 10 : 15;

  if (transaction.type === 'express') {
    icon = <span style={{fontSize: iconFontSize}}>{transaction.data.response.status}</span>;

    if (transaction.data.response.status < 300) {
      color = Colors.green500;
    } else if (transaction.data.response.status >= 500) {
      color = Colors.red500;
    } else if (transaction.data.response.status >= 400) {
      color = Colors.yellow500;
    }

    title = transaction.data.request.method + ' ' + transaction.data.request.route;
  } else if (transaction.type.toLowerCase() === 'rabbitr') {
    icon = <span style={{fontSize: iconFontSize}}>{transaction.data.status}</span>;

    if (transaction.data.status === 'ack') {
      color = Colors.green500;
    } else if (transaction.data.status === 'reject') {
      color = Colors.yellow500;
    } else if (transaction.data.status === 'error') {
      color = Colors.red500;
    }

    title = transaction.data.topic;
  }

  if (isSmall) {
    return (
      <div style={smallStyle}>
        <div style={smallAvatarStyle}>{icon}</div>
        <div style={smallDataStyle}>{title} <span style={{float: 'right'}}>transaction.system</span></div>
      </div>
    );
  }
  return (
    <div>
      <ListItem primaryText={title} secondaryText={transaction.system}
        leftAvatar={<Avatar icon={icon} backgroundColor={color} />} onClick={() => onClick && onClick(transaction)} />
        {(transaction.children || []).map(child => (
          <Transaction key={child.id} isSmall transaction={child} onClick={() => onClick && onClick(child)} />
        ))}
    </div>
  );
};
Transaction.propTypes = {
  isSmall: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  transaction: React.PropTypes.object.isRequired,
};

export default Transaction;
