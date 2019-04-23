import React from 'react'
import { IComment } from '../../../types/CommentTypes'

interface ICommentProps {
  comment: IComment
}

const Comment: React.SFC<ICommentProps> = props => {
  const { comment } = props

  return (
    <div>
      <p>{comment.content}</p>
      <p>{comment.user.username}</p>
    </div>
  )
}

export default Comment
