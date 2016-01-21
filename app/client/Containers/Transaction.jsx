import * as React from 'react';

const Transaction = (props) => (
  <p>Single transaction. <code>{props.params.transaction_id}</code></p>
);

export default Transaction;
