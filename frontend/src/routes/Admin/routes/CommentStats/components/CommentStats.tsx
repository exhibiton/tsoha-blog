import { isEmpty } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { IRootReducer } from '../../../../../types/redux/rootReducerTypes'
import { getStats, IStats } from '../modules/CommentStatsDuck'

interface IAllPostsProps {
  getStats: () => void
  isLoading: boolean
  stats?: IStats[]
}

class AllPostsView extends React.Component<IAllPostsProps, {}> {
  componentDidMount() {
    this.props.getStats()
  }

  render() {
    const { isLoading, stats } = this.props

    if (isLoading || !stats || isEmpty(stats)) {
      return <div />
    }

    return (
      <div className="all-posts-container">
        {stats.map((stat, i) => (
          <div key={i} className="compact-section">
            <div className="compact-post-container">
              <p>
                User: {stat.username} Comment count:{stat.stats}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { stats, isLoading } = state.stats

  return {
    isLoading,
    stats,
  }
}

const mapDispatchToProps = {
  getStats,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllPostsView)
