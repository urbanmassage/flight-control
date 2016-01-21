import * as React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

let Theme = ThemeManager.modifyRawThemePalette(ThemeManager.getMuiTheme(LightRawTheme), {
  primary1Color: Colors.yellow500,
  primary2Color: Colors.yellow700,
  primary3Color: Colors.yellow300,
  accent1Color: Colors.green500,
  accent2Color: Colors.green700,
  accent3Color: Colors.green300,
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
        <AppBar title="Flight Control"
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
