import { isEmpty } from 'lodash'
import React from 'react'
import { IComment } from '../../../types/CommentTypes'
import Comment from './Comment'

interface ICommentListProps {
  comments: IComment[]
}

const CommentList: React.SFC<ICommentListProps> = props => {
  const { comments } = props

  if (isEmpty(comments)) {
    return <div />
  } else {
    return (
      <div>
        {comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    )
  }
}

export default CommentList
