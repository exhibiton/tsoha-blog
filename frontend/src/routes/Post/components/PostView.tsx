import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IPost } from 'src/types/PostTypes'
import backArrow from '../../../assets/back-arrow.svg'
import postImg from '../../../assets/firstblog.jpg'
import { ILocationState } from '../../../store/reducers/location-reducer'
import { IComment } from '../../../types/CommentTypes'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { IUser } from '../../../types/UserTypes'
import { getPost } from '../modules/PostApi'
import CommentList from './CommentList'
import './PostView.css'

interface IPostViewProps {
  currentUser?: IUser
  getPost: (postId: string) => void
  isLoading: boolean
  post: IPost
  comments?: IComment[]
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
    const { comments, currentUser, isLoading, post } = this.props

    if (isLoading || !post) {
      return <div>Loading</div>
    } else {
      return (
        <div className="container-post">
          <div className="arrow-container">
            <Link to="/">
              <img height="40" width="40" src={backArrow} />
            </Link>
          </div>
          <div className="post-title">{post.title}</div>
          <div className="image-container">
            <img width="945" height="532" src={postImg} />
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="comment-section">
            <CommentList currentUser={currentUser} comments={comments} />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { comments, post, isLoading } = state.post
  const { currentUser } = state.auth

  return {
    comments,
    currentUser,
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
