import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import './LoginForm.css'

const LoginForm: React.SFC<InjectedFormProps> = props => {
  const { error, handleSubmit, submitting } = props

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-3 color-red">
            <strong>{error}</strong>
          </div>
        )}
        <label>Email</label>
        <div>
          <Field className="mb-3" component="input" name="email" type="text" placeholder="Email Address" />
        </div>
        <label>Password</label>
        <div>
          <Field className="mb-3" component="input" name="password" type="password" placeholder="Password" />
        </div>
        <div className="mvs">
          <button className="submit-button" type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
