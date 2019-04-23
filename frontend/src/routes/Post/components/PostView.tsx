import React from 'react'
import { connect } from 'react-redux'
import { IPost } from 'src/types/PostTypes'
import postImg from '../../../assets/firstblog.jpg'
import { ILocationState } from '../../../store/reducers/location-reducer'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { getPost } from '../modules/PostApi'
import CommentList from './CommentList'
import './PostView.css'

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
        <div className="container-post">
          <div className="post-title">{post.title}</div>
          <div className="image-container">
            <img width="945" height="532" src={postImg} />
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="comment-section">
            <CommentList comments={post.comments} />
          </div>
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
