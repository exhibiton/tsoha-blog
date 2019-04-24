import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

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
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createReduxStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  )
  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default

      store.replaceReducer(reducers())
    })
  }

  return { store, persistor }
}

export default createStore
