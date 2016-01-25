import Colors from 'material-ui/lib/styles/colors';

const ErrorMessage = ({message}) => (
  <div style={{
    background: Colors.red50,
    color: Colors.red900,
    padding: 20,
    border: '1px solid ' + Colors.redA700,
  }}>{message}</div>
);

export default ErrorMessage;
