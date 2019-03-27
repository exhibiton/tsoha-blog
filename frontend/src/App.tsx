import * as React from 'react'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { AnyAction, Store } from 'redux'
import { IRootReducer } from './types/redux/rootReducerTypes'

export interface IAppProps {
  store: Store<IRootReducer, AnyAction>
  routes: any
}

class App extends React.Component<IAppProps, {}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router
          history={browserHistory}
          children={this.props.routes}
        />
      </Provider>
    )
  }
}

export default App
