import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IPost } from 'src/types/PostTypes'
import firstImg from '../../../assets/firstblog.jpg'
import otherImg from '../../../assets/result.jpg'
import secondImg from '../../../assets/secondblog.jpg'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { getPosts } from '../modules/HomeApi'
import './HomeView.css'

interface IHomeViewProps {
  getPosts: () => void
  isLoading: boolean
  posts?: IPost[]
}
class HomeView extends React.Component<IHomeViewProps, {}> {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { isLoading, posts } = this.props

    if (isLoading) {
      return <div>Loading</div>
    }

    let lastPosts
    const lastPost = posts.length - 1

    if (posts.length > 4) {
      lastPosts = posts.slice(lastPost - 3, lastPost)
      return (
        <div className="container-home">
          <div className="title header-title">Blog Posts</div>
          <div className="posts-container">
            <div className="first-row">
              <div className="first-card">
                <Link to={`/posts/${posts[0].id}`}>
                  <img className="first-img" src={firstImg} />
                </Link>

                <div className="first-post">
                  <p className="home-post">{posts[0].title}</p>
                  <div className="post-info">
                    <p className="post-details-text">{posts[0].title}</p>
                    <p className="post-details-text">{posts[0].admin.username}</p>
                  </div>
                  <p className="post-text">
                    {posts[0].content.length > 200 ? posts[0].content.substring(0, 199) : posts[0].content}
                  </p>
                </div>
                <div className="read-more">
                  <Link to={`/posts/${posts[0].id}`}>Read More</Link>
                </div>
              </div>
              <div className="second-card">
                <Link to={`/posts/${posts[1].id}`}>
                  <img className="second-img" src={secondImg} />
                </Link>

                <div className="second-post">
                  <p className="home-post">{posts[1].title}</p>
                  <div className="post-info">
                    <p className="post-details-text">{posts[1].title}</p>
                    <p className="post-details-text">{posts[1].title}</p>
                  </div>
                  <p className="post-text">
                    {posts[1].content.length > 100 ? posts[1].content.substring(0, 99) : posts[1].content}
                  </p>
                </div>
                <div className="read-more">
                  <Link to={`/posts/${posts[1].id}`}>Read More</Link>
                </div>
              </div>
            </div>
            <div className="second-row">
              {lastPosts.map((post, i) => (
                <div key={i} className="card">
                  <div>
                    <Link to={`/posts/${post.id}`}>
                      <img width="340" src={otherImg} />
                    </Link>
                  </div>
                  <div className="post">
                    <p>{post.title}</p>
                    <p className="post-text">
                      {post.content.length > 100 ? post.content.substring(0, 99) : post.content}
                    </p>
                  </div>
                  <div className="read-more">
                    <Link to={`/posts/${post.id}`}>Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else if (posts.length === 4) {
      lastPosts = posts.slice(lastPost - 2, lastPost)
      return (
        <div>
          <div className="first-post">
            <p>{posts[0].title}</p>
            <p className="post-text">
              {posts[0].content.length > 200 ? posts[0].content.substring(0, 199) : posts[0].content}
            </p>
          </div>
          <div className="second-post">
            <p>{posts[1].title}</p>
            <p className="post-text">
              {posts[1].content.length > 100 ? posts[1].content.substring(0, 99) : posts[1].content}
            </p>
          </div>
          <div>
            {lastPosts.map((post, i) => (
              <div key={i}>
                <p>{post.title}</p>
                <p className="post-text">
                  {post.content.length > 100 ? post.content.substring(0, 99) : post.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (posts.length === 3) {
      return (
        <div>
          <div className="first-post">
            <p>{posts[0].title}</p>
            <p className="post-text">
              {posts[0].content.length > 200 ? posts[0].content.substring(0, 199) : posts[0].content}
            </p>
          </div>
          <div className="second-post">
            <p>{posts[1].title}</p>
            <p className="post-text">
              {posts[1].content.length > 100 ? posts[1].content.substring(0, 99) : posts[1].content}
            </p>
          </div>
          <div className="post">
            <p>{posts[2].title}</p>
            {posts[2].content.length > 100 ? posts[2].content.substring(0, 99) : posts[2].content}
          </div>
        </div>
      )
    } else if (posts.length === 2) {
      return (
        <div>
          <div className="first-post">
            <p>{posts[0].title}</p>
            <p className="post-text">
              {posts[0].content.length > 200 ? posts[0].content.substring(0, 199) : posts[0].content}
            </p>
          </div>
          <div className="second-post">
            <p>{posts[1].title}</p>
            <p className="post-text">
              {posts[1].content.length > 100 ? posts[1].content.substring(0, 99) : posts[1].content}
            </p>
          </div>
        </div>
      )
    } else if (posts.length === 1) {
      return (
        <div>
          <div className="first-post">
            <p>{posts[0].title}</p>
            <p className="post-text">
              {posts[0].content.length > 200 ? posts[0].content.substring(0, 199) : posts[0].content}
            </p>
          </div>
        </div>
      )
    } else {
      return <div>No blog posts to show yet!</div>
    }
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
)(HomeView)
