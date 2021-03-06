import * as React from 'react';
import {Link} from 'react-router';

import TransactionAvatar from './TransactionAvatar';
import DurationString from './DurationString';
import TimeString from './TimeString';

import TransactionInput from './TransactionInput';
import TransactionOutput from './TransactionOutput';
import TransactionLog from './TransactionLog';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import Transaction from './Transaction';

const smallAvatarSize = 30;
const smallPadding = 20;

const smallStyle = {padding: smallPadding + 'px ' + smallPadding + 'px ' + (smallAvatarSize + smallPadding * 2) + 'px'};
const smallDataStyle = {width: '50px'};
const smallAvatarStyle = {};

const SingleTransaction = ({transaction, transactionChildren, onSelect}) => {
  let title = transaction.type;

  if (transaction.type === 'express') {
    title = transaction.data.request.method + ' ' + transaction.data.request.route;
  } else if (transaction.type.toLowerCase() === 'rabbitr') {
    title = transaction.data.topic;
  }

  const timestamp = <TimeString time={transaction.timestamp} />;
  const subtitle = <span>{transaction.system} - {timestamp}</span>;

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
        avatar={<TransactionAvatar transaction={transaction} />}>
          <DurationString duration={transaction.time || 0} style={{
            fontSize: 15,
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 15,
          }} />
          &nbsp;
          {transaction.parent ? <Link to={`/transactions/${transaction.parent}`}>parent</Link> : null}
        </CardHeader>
      <CardText>
        <TransactionInput transaction={transaction} />
        {transaction && transaction.data ? <br /> : null}
        {transactionChildren ? (
          transactionChildren.map(child => {
            let {type, system} = child.data;
            let content;
            if (child.type === 'transaction') {
              content = <Transaction transaction={child.data} onClick={onSelect} />;
            } else {
              content = <TransactionLog log={child.data} />;
            }
            return <div key={child._id}>{content}</div>;
          })
        ) : null}
        {transactionChildren && transactionChildren.length ? <br /> : null}
        <TransactionOutput transaction={transaction} />
      </CardText>
    </Card>
  )
};
SingleTransaction.propTypes = {
  onSelect: React.PropTypes.func,
  transaction: React.PropTypes.object.isRequired,
  transactionChildren: React.PropTypes.arrayOf(React.PropTypes.object.isRequired),
};

export default SingleTransaction;
