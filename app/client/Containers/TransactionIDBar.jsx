import * as React from 'react';
import TextField from 'material-ui/lib/text-field';

const TransactionIDBar = () => (
  <form method="get">
    <TextField name="transaction" hintText="Transaction ID" />
  </form>
);

export default TransactionIDBar;
