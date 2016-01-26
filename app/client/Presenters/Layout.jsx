import * as React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import * as Colors from '../Colors';

let Theme = ThemeManager.modifyRawThemePalette(ThemeManager.getMuiTheme(LightRawTheme), {
  primary1Color: Colors.PRIMARY,
  primary2Color: Colors.PRIMARY_HOVER,
  primary3Color: Colors.PRIMARY_DISABLED,
  accent1Color: Colors.ACCENT,
  accent2Color: Colors.ACCENT_HOVER,
  accent3Color: Colors.ACCENT_DISABLED,
  // textColor: string,
  // canvasColor: string,
  // borderColor: string,
  // disabledColor: string,
  // alternateTextColor: string,
});

@ThemeDecorator(Theme)
class Layout extends React.Component {
  render() {
    return (
      <div>
        <AppBar title={<Link to="/transactions" style={{textDecoration: 'none', color: 'inherit'}}>Flight Control</Link>}
          showMenuIconButton={false}
          iconElementRight={this.props.searchBar} />
        <div style={{padding: Theme.rawTheme.spacing.desktopGutter}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
