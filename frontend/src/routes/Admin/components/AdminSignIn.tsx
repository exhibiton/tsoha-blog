import React from 'react'
import { connect } from 'react-redux'
import { adminLogin } from '../../../api/auth-api'
import { ISignInData } from '../../../types/UserTypes'
import AdminLoginForm from './AdminLoginForm'

interface ISignInProps {
  adminLogin: (data: ISignInData) => void
}

class AdminSignIn extends React.Component<ISignInProps, {}> {
  handleSignIn = (data: ISignInData) => this.props.adminLogin(data)

  render() {
    return (
      <div className="login-container">
        <div className="login-section">
          <div className="sign-in">Admin Secret Log In</div>
          <div className="login-text">
            <AdminLoginForm onSubmit={this.handleSignIn} />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  adminLogin,
}

export default connect(
  null,
  mapDispatchToProps,
)(AdminSignIn)
