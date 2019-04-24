import { isEmpty } from 'lodash'
import React from 'react'
import { IComment } from '../../../types/CommentTypes'
import { IUser } from '../../../types/UserTypes'
import Comment from './Comment'

interface ICommentListProps {
  comments: IComment[]
  currentUser?: IUser
}

const CommentList: React.SFC<ICommentListProps> = props => {
  const { comments, currentUser } = props

  if (isEmpty(comments)) {
    return <div />
  } else {
    return (
      <div>
        {comments.map((comment, i) => (
          <Comment currentUser={currentUser} comment={comment} key={i} />
        ))}
      </div>
    )
  }
}

export default CommentList
