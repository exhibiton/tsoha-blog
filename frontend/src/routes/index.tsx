// We only need to import the modules necessary for initial render
import { getToken } from '../api/utils/authorization-token'
import CoreLayout from '../layouts/PageLayout'
import { IRootReducer } from '../types/redux/rootReducerTypes'
import AdminSignIn from './Admin'
import AddPost from './Admin/routes/AddPost'
import CommentView from './Comment'
import Home from './Home'
import PostView from './Post'
import SignIn from './SignIn'

function redirectToLogin(nextState: any, replace: any) {
  if (!getToken() && nextState.location.pathname === '/users') {
    replace({
      pathname: '/sign_in',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store: IRootReducer) => [
  {
    childRoutes: [AdminSignIn, PostView, SignIn, CommentView, AddPost],
    component: CoreLayout,
    indexRoute: Home,
    onEnter: (nextState: any, replace: any) => redirectToLogin(nextState, replace),
    path: '/',
  },
]
/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }
    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/
export default createRoutes
