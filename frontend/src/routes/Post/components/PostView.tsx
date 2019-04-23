import React from 'react'
import { connect } from 'react-redux'
import { IPost } from 'src/types/PostTypes'
import { ILocationState } from '../../../store/reducers/location-reducer'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { getPost } from '../modules/PostApi'
import CommentList from './CommentList'

interface IPostViewProps {
  getPost: (postId: string) => void
  isLoading: boolean
  post: IPost
  location: ILocationState
  params: {
    id: string
  }
}

class PostView extends React.Component<IPostViewProps, {}> {
  componentDidMount() {
    this.props.getPost(this.props.params.id)
  }

  render() {
    const { isLoading, post } = this.props

    if (isLoading || !post) {
      return <div>Loading</div>
    } else {
      return (
        <div>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <p>{post.admin.username}</p>
          <p>{post.date_created}</p>
          <CommentList comments={post.comments} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { post, isLoading } = state.post

  return {
    isLoading,
    post,
  }
}

const mapDispatchToProps = {
  getPost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostView)
