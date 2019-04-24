import * as React from 'react'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { AnyAction, Store } from 'redux'
import { Persistor } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { IRootReducer } from './types/redux/rootReducerTypes'

export interface IAppProps {
  store: Store<IRootReducer, AnyAction>
  persistor: Persistor
  routes: any
}

class App extends React.Component<IAppProps, {}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <PersistGate loading={null} persistor={this.props.persistor}>
          <Router history={browserHistory} children={this.props.routes} />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
