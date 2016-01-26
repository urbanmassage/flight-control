import * as React from 'react';
import PrettyJSON from './PrettyJSON';

const TransactionOutput = ({transaction}) => {
  let output = null;

  switch (transaction.type) {
    case 'express':
    output = transaction.data.response;
    break;
  }
  if (!output) return <noscript />;

  return <PrettyJSON data={output} />;
}
export default TransactionOutput;
