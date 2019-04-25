import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IPost } from 'src/types/PostTypes'
import { IRootReducer } from '../../../../../types/redux/rootReducerTypes'
import { getPosts } from '../../../../Home/modules/HomeApi'
import './AllPostsView.css'
import arrowRight from './images/arrow-right.svg'

interface IAllPostsProps {
  getPosts: () => void
  isLoading: boolean
  posts?: IPost[]
}

class AllPostsView extends React.Component<IAllPostsProps, {}> {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { isLoading, posts } = this.props

    if (isLoading) {
      return <div>Loading</div>
    }

    return (
      <div className="all-posts-container">
        {posts.map((post, i) => (
          <Link key={i} to={`posts/${post.id}`}>
            <div className="compact-section">
              <div className="compact-post-container">
                <p>{post.title}</p>
                <p className="post-text">
                  {post.content.length > 100 ? post.content.substring(0, 99) : post.content}
                </p>
                <p>Posted on {moment(new Date(post.date_created)).format('DD/MM/YYYY')}</p>
              </div>
              <div className="arrow-container">
                <img height="50" src={arrowRight} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { posts, isLoading } = state.home

  return {
    isLoading,
    posts,
  }
}

const mapDispatchToProps = {
  getPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllPostsView)
