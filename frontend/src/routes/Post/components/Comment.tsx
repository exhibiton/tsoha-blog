// tslint:disable: jsx-no-lambda
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IUser } from 'src/types/UserTypes'
import { deleteComment } from '../../../api/posts-api'
import { IComment } from '../../../types/CommentTypes'
import './Comment.css'

interface ICommentProps {
  comment: IComment
  currentUser?: IUser
  deleteComment: (comment: IComment) => void
}

class Comment extends React.Component<ICommentProps, {}> {
  renderButtons = () => {
    const { currentUser, comment } = this.props
    if (currentUser && comment.user.username === currentUser.name) {
      return (
        <div className="control-buttons">
          <Link to={`/comments/${comment.id}`}>
            <div className="button">Edit</div>
          </Link>
          <div onClick={() => this.props.deleteComment(comment)} className="button">
            Delete
          </div>
        </div>
      )
    }

    return <div />
  }

  render() {
    const { comment } = this.props

    return (
      <div className="container-comment">
        <p>{comment.content}</p>
        <div className="controls">
          <div className="comment-bottom">
            <div className="comment-by">comment by:</div>
            &nbsp;
            <div className="comment-author">{comment.user.username}</div>
          </div>
          <div>{this.renderButtons()}</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteComment,
}

export default connect(
  null,
  mapDispatchToProps,
)(Comment)
