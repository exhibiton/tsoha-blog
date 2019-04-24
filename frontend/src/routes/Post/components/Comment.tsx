import React from 'react'
import { Link } from 'react-router'
import { IUser } from 'src/types/UserTypes'
import { IComment } from '../../../types/CommentTypes'
import './Comment.css'

interface ICommentProps {
  comment: IComment
  currentUser?: IUser
}

const Comment: React.SFC<ICommentProps> = props => {
  const { comment, currentUser } = props

  const renderButtons = () => {
    if (currentUser && comment.user.username === currentUser.name) {
      return (
        <div className="control-buttons">
          <Link to={`/comments/${comment.id}`}>
            <div className="button">Edit</div>
          </Link>
          <div className="button">Delete</div>
        </div>
      )
    }

    return <div />
  }

  return (
    <div className="container-comment">
      <p>{comment.content}</p>
      <div className="controls">
        <div className="comment-bottom">
          <div className="comment-by">comment by:</div>
          &nbsp;
          <div className="comment-author">{comment.user.username}</div>
        </div>
        <div>{renderButtons()}</div>
      </div>
    </div>
  )
}

export default Comment
