import * as React from 'react';
import YAML from 'json2yaml';

import TransactionAvatar from './TransactionAvatar';
import DurationString from './DurationString';

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

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={transaction.system}
        avatar={<TransactionAvatar transaction={transaction} />}>
          <DurationString duration={transaction.time || 0} style={{
            fontSize: 15,
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 15,
          }} />
        </CardHeader>
      <CardText>
        {transactionChildren ? (
          transactionChildren.map(child => {
            let {type, system} = child.data;
            let content;
            if (child.type === 'transaction') {
              content = <Transaction transaction={child.data} onClick={onSelect} />;
            } else {
              let yaml = YAML.stringify(child.data);
              content = <pre>{yaml}</pre>;
            }
            return <div key={child._id}>{content}</div>;
          })
        ) : null}
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
