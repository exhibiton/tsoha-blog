import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../../api/auth-api'
import { ISignInData } from '../../../types/UserTypes'
import LoginForm from './LoginForm'
import './SignIn.css'

interface ISignInProps {
  login: (data: ISignInData) => void
}

class SignIn extends React.Component<ISignInProps, {}> {
  handleSignIn = (data: ISignInData) => this.props.login(data)

  render() {
    return (
      <div className="login-container">
        <div className="login-section">
          <div className="sign-in">Sign In</div>
          <div className="login-text">
            <LoginForm onSubmit={this.handleSignIn} />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  login,
}

export default connect(
  null,
  mapDispatchToProps,
)(SignIn)
