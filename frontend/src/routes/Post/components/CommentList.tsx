import { isEmpty } from 'lodash'
import React from 'react'
import { IComment } from '../../../types/CommentTypes'
import { IUser } from '../../../types/UserTypes'
import AddComment from './AddComment'
import Comment from './Comment'
interface ICommentListProps {
  comments: IComment[]
  currentUser?: IUser
}

const CommentList: React.SFC<ICommentListProps> = props => {
  const { comments, currentUser } = props

  if (isEmpty(comments) && !currentUser.isAdmin) {
    return <AddComment currentUser={currentUser} />
  } else {
    return (
      <div>
        {comments.map((comment, i) => (
          <Comment currentUser={currentUser} comment={comment} key={i} />
        ))}
        {currentUser && !isEmpty(currentUser) && !currentUser.isAdmin && (
          <AddComment currentUser={currentUser} />
        )}
      </div>
    )
  }

  return <div />
}

export default CommentList
