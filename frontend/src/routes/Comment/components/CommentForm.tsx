import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import './CommentForm.css'

const CommentForm: React.SFC<InjectedFormProps> = props => {
  const { error, handleSubmit, submitting } = props

  return (
    <div className="comment-section-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-3 color-red">
            <strong>{error}</strong>
          </div>
        )}
        <div className="comment-label">
          <label>Comment</label>
        </div>
        <div>
          <Field className="comment-field" name="content" component="textarea" placeholder="Comment..." />
        </div>
        <div>
          <button className="submit-button" type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'CommentForm',
})(CommentForm)
