import * as React from 'react';
import {render} from 'react-dom';
import App from './App';

window.React = React;

import 'normalize.css';

render(<App />, document.getElementById('app'));
