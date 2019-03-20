import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/createStore'

const MOUNT_NODE = document.getElementById('root')

const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <App store={store}/>,
  MOUNT_NODE
);
registerServiceWorker();

