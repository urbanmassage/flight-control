import * as React from 'react';
import PrettyJSON from './PrettyJSON';

const TransactionLog = ({log}) => {
  let {data} = log;
  return <PrettyJSON data={data} />;
}
export default TransactionLog;
