import React from 'react'
import { IComment } from '../../../types/CommentTypes'
import './Comment.css'

interface ICommentProps {
  comment: IComment
}

const Comment: React.SFC<ICommentProps> = props => {
  const { comment } = props

  return (
    <div className="container-comment">
      <p>{comment.content}</p>
      <div className="comment-bottom">
        <div className="comment-by">comment by:</div>
        &nbsp;
        <div className="comment-author">{comment.user.username}</div>
      </div>
    </div>
  )
}

export default Comment
