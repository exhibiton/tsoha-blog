import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const createStore = (initialState = {}) => {
    // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

    // ======================================================
  // Store Enhancers
  // ======================================================
  let composeEnhancers = compose

  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

    // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      
      store.replaceReducer(reducers())
    })
  }

  return store
}

export default createStore