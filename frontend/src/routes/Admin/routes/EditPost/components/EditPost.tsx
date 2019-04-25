// tslint:disable: jsx-no-lambda
import React from 'react'
import { connect } from 'react-redux'
import { ILocationState } from 'src/store/reducers/location-reducer'
import { IRootReducer } from 'src/types/redux/rootReducerTypes'
import { IUser } from 'src/types/UserTypes'
import { deletePost, getPost, updatePost } from '../../../../../api/posts-api'
import { IPost } from '../../../../../types/PostTypes'
import AddPostForm from '../../AddPost/components/AddPostForm'
import './EditPost.css'

interface IEditPostProps {
  currentUser?: IUser
  deletePost: (postId: string) => void
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
      <div className="edit-post-container">
        <button className="delete-button" onClick={() => this.props.deletePost(`${post.id}`)}>
          Delete Post
        </button>
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
  deletePost,
  getPost,
  updatePost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPost)
