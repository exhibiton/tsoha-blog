import React from 'react'
import { connect } from 'react-redux'
import { ILocationState } from 'src/store/reducers/location-reducer'
import { IComment } from 'src/types/CommentTypes'
import { IUser } from 'src/types/UserTypes'
import { ICommentUpdateData } from '../../../types/CommentTypes'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { getComment, updateComment } from '../modules/CommentEditApi'
import CommentForm from './CommentForm'

interface ICommentEditProps {
  currentUser?: IUser
  getComment: (postId: string) => void
  isLoading: boolean
  location: ILocationState
  comment: IComment
  params: {
    id: string
  }
  updateComment: (data: ICommentUpdateData) => void
}

class CommentEdit extends React.Component<ICommentEditProps, {}> {
  componentDidMount() {
    this.props.getComment(this.props.params.id)
  }

  handleSubmit = (data: ICommentUpdateData) => this.props.updateComment(data)

  render() {
    const { comment } = this.props

    return (
      <div>
        <CommentForm enableReinitialize={true} onSubmit={this.handleSubmit} initialValues={comment} />
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { comment, isLoading } = state.comment
  const { currentUser } = state.auth

  return {
    comment,
    currentUser,
    isLoading,
  }
}

const mapDispatchToProps = {
  getComment,
  updateComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentEdit)
