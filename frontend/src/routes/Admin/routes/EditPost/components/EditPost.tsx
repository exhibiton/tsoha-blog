import React from 'react'
import { connect } from 'react-redux'
import { ILocationState } from 'src/store/reducers/location-reducer'
import { IRootReducer } from 'src/types/redux/rootReducerTypes'
import { IUser } from 'src/types/UserTypes'
import { getPost, updatePost } from '../../../../../api/posts-api'
import { IPost } from '../../../../../types/PostTypes'
import AddPostForm from '../../AddPost/components/AddPostForm'

interface IEditPostProps {
  currentUser?: IUser
  getPost: (postId: string) => void
  isLoading: boolean
  post: IPost
  location: ILocationState
  params: {
    id: string
  }
  updatePost: (data: IPost) => void
}

class EditPost extends React.Component<IEditPostProps, {}> {
  componentDidMount() {
    this.props.getPost(this.props.params.id)
  }

  handleSubmit = (data: IPost) => this.props.updatePost(data)

  render() {
    const { post } = this.props

    return (
      <div>
        <AddPostForm enableReinitialize={true} onSubmit={this.handleSubmit} initialValues={post} />
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { post, isLoading } = state.post
  const { currentUser } = state.auth

  return {
    currentUser,
    isLoading,
    post,
  }
}

const mapDispatchToProps = {
  getPost,
  updatePost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPost)
