import * as React from 'react';
import PrettyJSON from './PrettyJSON';

const TransactionInput = ({transaction}) => {
  let input = transaction.data;

  switch (transaction.type) {
    case 'express':
    input = transaction.data.request;
    break;
  }
  if (!input) return <noscript />;

  return <PrettyJSON data={input} />;
}
export default TransactionInput;
