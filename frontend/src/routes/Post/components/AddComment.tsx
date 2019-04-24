import React from 'react'
import { connect } from 'react-redux'
import { IRootReducer } from 'src/types/redux/rootReducerTypes'
import { IUser } from 'src/types/UserTypes'
import { addComment } from '../modules/CommentApi'
import AddCommentForm from './AddCommentForm'

interface IAddCommentProps {
  currentUser?: IUser
  postId: number
  addComment: (comment: string, postId: string) => void
}

class AddCommentView extends React.Component<IAddCommentProps, {}> {
  handleSubmit = (data: string) => {
    return this.props.addComment(data, `${this.props.postId}`)
  }

  render() {
    const { currentUser } = this.props

    if (currentUser) {
      return (
        <div>
          Add Comment
          <div>
            <AddCommentForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      )
    }

    return <div>Log in to comment</div>
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const {
    isLoading,
    post: { id },
  } = state.post

  return {
    isLoading,
    postId: id,
  }
}

const mapDispatchToProps = {
  addComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommentView)
