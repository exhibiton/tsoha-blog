import { isEmpty } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from '../api/auth-api'
import logo from '../assets/logo.svg'
import { IRootReducer } from '../types/redux/rootReducerTypes'
import { IUser } from '../types/UserTypes'
import './Header.css'

interface IHeaderProps {
  isAdmin: boolean
  logout: () => void
  user?: IUser
}

class Header extends React.Component<IHeaderProps, {}> {
  render() {
    const { user, isAdmin } = this.props
    if (user && !isEmpty(user)) {
      return (
        <div className="container">
          <Link to="/">
            <img src={logo} />
          </Link>
          {isAdmin && <div>Add Post</div>}
          <div className="">Hi {user.name}</div>
          <a href="/" onClick={this.props.logout}>
            Logout
          </a>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Link to="/">
            <img src={logo} />
          </Link>
          <div className="login-button">
            <Link to="/sign_in">LOG IN</Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { currentUser, userIsAdmin } = state.auth

  return {
    isAdmin: userIsAdmin,
    user: currentUser,
  }
}

const mapDispatchToProps = {
  logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
