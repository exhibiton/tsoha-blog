import { isEmpty } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { ILocationState } from 'src/store/reducers/location-reducer'
import { IUser } from 'src/types/UserTypes'
import { addPost } from '../../../../../api/posts-api'
import { IAddPostData } from '../../../../../types/PostTypes'
import { IRootReducer } from '../../../../../types/redux/rootReducerTypes'
import AddPostForm from './AddPostForm'

interface IAddPostProps {
  addPost: (data: IAddPostData) => void
  currentUser?: IUser
  isLoading: boolean
  location: ILocationState
}

class AddPostView extends React.Component<IAddPostProps, {}> {
  handleSubmit = (data: IAddPostData) => this.props.addPost(data)

  render() {
    const { currentUser } = this.props
    if (currentUser && !isEmpty(currentUser) && currentUser.isAdmin) {
      return (
        <div>
          <AddPostForm onSubmit={this.handleSubmit} />
        </div>
      )
    }
    return <div>Only for admins</div>
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { isLoading } = state.post
  const { currentUser } = state.auth

  return {
    currentUser,
    isLoading,
  }
}

const mapDispatchToProps = {
  addPost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPostView)
