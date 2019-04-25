import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import './AddPostView.css'

const AddPostForm: React.SFC<InjectedFormProps> = props => {
  const { error, handleSubmit, submitting } = props

  return (
    <div className="comment-section-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-3 color-red">
            <strong>{error}</strong>
          </div>
        )}
        <div className="add-post-form">
          <div className="content-label">
            <label>Title</label>
          </div>
          <div>
            <Field
              className="title-field"
              component="input"
              name="title"
              type="text"
              placeholder="Title..."
            />
          </div>
          <div className="content-label">
            <label>Content</label>
          </div>
          <div>
            <Field className="content-field" name="content" component="textarea" placeholder="Comment..." />
          </div>
          <div>
            <button className="submit-button" type="submit" disabled={submitting}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'addPostForm',
})(AddPostForm)
