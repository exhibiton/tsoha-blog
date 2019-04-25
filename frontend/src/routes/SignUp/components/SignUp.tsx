import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../../api/auth-api'
import { ISignInData } from '../../../types/UserTypes'
import LoginForm from '../../SignIn/components/LoginForm'

interface ISignInProps {
  signUp: (data: ISignInData) => void
}

class SignUp extends React.Component<ISignInProps, {}> {
  handleSignIn = (data: ISignInData) => this.props.signUp(data)

  render() {
    return (
      <div className="login-container">
        <div className="login-section">
          <div className="sign-in">Sign Up</div>
          <div className="login-text">
            <LoginForm onSubmit={this.handleSignIn} />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signUp,
}

export default connect(
  null,
  mapDispatchToProps,
)(SignUp)
