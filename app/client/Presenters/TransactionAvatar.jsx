import * as React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

class TransactionAvatar extends Avatar {
  render() {
    const {transaction, isSmall} = this.props;
    let color = Colors.blue500;
    let icon = <span />;

    const iconFontSize = isSmall ? 10 : 15;
    const size = isSmall ? 25 : 40;

    if (transaction.type === 'express') {
      icon = <span style={{fontSize: iconFontSize}}>{transaction.data.response.status}</span>;

      if (transaction.data.response.status < 300) {
        color = Colors.green500;
      } else if (transaction.data.response.status >= 500) {
        color = Colors.red500;
      } else if (transaction.data.response.status >= 400) {
        color = Colors.yellow500;
      }
    } else if (transaction.type.toLowerCase() === 'rabbitr') {
      icon = <span style={{fontSize: iconFontSize}}>{transaction.data.status}</span>;

      if (transaction.data.status === 'ack') {
        color = Colors.green500;
      } else if (transaction.data.status === 'reject') {
        color = Colors.yellow500;
      } else if (transaction.data.status === 'error') {
        color = Colors.red500;
      }
    }

    let _props = this.props;
    let props = Object.assign({}, this.props, {
      icon,
      backgroundColor: color,
    });

    let r;
    try {
      this.props = props;
      r = super.render();
    }
    finally {
      this.props = _props;
    }
    return r;
  }

  static propTypes = Object.assign({
    isSmall: React.PropTypes.bool,
    transaction: React.PropTypes.object.isRequired,
  }, Avatar.propTypes);
}

export default TransactionAvatar;
