import React from 'react'
import { connect } from 'react-redux'
import { IPost } from 'src/types/PostTypes'
import { IRootReducer } from '../../../types/redux/rootReducerTypes'
import { getPosts } from '../modules/HomeApi'

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

    return (
      <div>
        {posts.map((post, i) => (
          <div key={i}>
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
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
)(HomeView)
