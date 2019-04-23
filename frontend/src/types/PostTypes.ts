import { IComment } from './CommentTypes'
export interface IPostData {
  posts: IPost
}

export interface IPost {
  admin: {
    username: string
  }
  comments: IComment[]
  date_created: string
  content: string
  id: number
  title: string
}
