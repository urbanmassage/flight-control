import * as React from 'react';
import Layout from '../Presenters/Layout';
import TransactionIDBar from './TransactionIDBar';
import loadSearch from '../actions/load-search';
import {connect} from 'react-redux';

let devTools = null;

@connect(null, {loadSearch})
class App extends React.Component {
  componentDidMount() {
    this.props.loadSearch();
    if (process.env.NODE_ENV === 'development') {
      // Hack to avoid mismatch in first render between server and client.
      // Devtools need window width and height to be known.
      const DevTools = require('./DevTools').default;
      devTools = <DevTools />;
      this.forceUpdate();
    }
  }
  render() {
    const {sidebar, main} = this.props;
    // TODO - find a better way? we use higher-order-components so we can't use class props
    let sidebarKey = sidebar.constructor.displayName;
    let mainKey = main.constructor.displayName;
    return (
      <div>
        {devTools}
        <Layout>
          <div className="row">
            <div className="col-sm-6 col-md-4" key={sidebarKey}>
              {sidebar}
            </div>
            <div className="col-sm-6 col-md-8" key={mainKey}>
              {main}
            </div>
          </div>
        </Layout>
      </div>
    );
  }
  static propTypes = {
    sidebar: React.PropTypes.element.isRequired,
    main: React.PropTypes.element.isRequired,
  };
}

export default App;
