import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import createStore from './store/createStore'

const MOUNT_NODE = document.getElementById('root')

const store = createStore(window.__INITIAL_STATE__)
// tslint:disable-next-line:no-var-requires
const routes = require('./routes/index').default(store)

ReactDOM.render(<App store={store.store} persistor={store.persistor} routes={routes} />, MOUNT_NODE)
registerServiceWorker()
