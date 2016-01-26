import * as React from 'react';
import moment from 'moment';
import ListItem from 'material-ui/lib/lists/list-item';

import TransactionAvatar from './TransactionAvatar';
import KeyboardArrowRight from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import DurationString from './DurationString';

const smallAvatarSize = 30;
const smallPadding = 20;

const smallStyle = {padding: smallPadding + 'px ' + smallPadding + 'px ' + (smallAvatarSize + smallPadding * 2) + 'px'};
const smallDataStyle = {width: '50px'};
const smallAvatarStyle = {};

const Transaction = ({transaction, isSmall, isActive, onClick}) => {
  let title = transaction.type;

  if (transaction.type === 'express') {
    title = transaction.data.request.method + ' ' + transaction.data.request.route;
  } else if (transaction.type.toLowerCase() === 'rabbitr') {
    title = transaction.data.topic;
  }

  const ts = moment(new Date(transaction.timestamp));
  const timestamp = <span title={transaction.timestamp}>{ts.fromNow()}</span>;
  const subtitle = <span>{transaction.system} {timestamp}</span>;

  if (isSmall) {
    return (
      <div style={smallStyle}>
        <div style={smallAvatarStyle}>{<TransactionAvatar transaction={transaction} />}</div>
        <div style={smallDataStyle}>{title} <span style={{float: 'right'}}>{subtitle}</span></div>
      </div>
    );
  }
  return (
    <div>
      <ListItem primaryText={title} secondaryText={subtitle}
        leftAvatar={<TransactionAvatar transaction={transaction} />}
        onClick={() => onClick && onClick(transaction)}
        rightIcon={
          isActive ?
            <KeyboardArrowRight /> :
            <DurationString duration={transaction.time || 0} style={{fontSize: 12}} />
        } />
        {(transaction.children || []).map(child => (
          <Transaction key={child.id} isSmall transaction={child} onClick={() => onClick && onClick(child)} />
        ))}
    </div>
  );
};
Transaction.propTypes = {
  isActive: React.PropTypes.bool,
  isSmall: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  transaction: React.PropTypes.object.isRequired,
};

export default Transaction;
