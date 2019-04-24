export interface ICommentData {
  comments: IComment
}

export interface IComment {
  content: string
  id: number
  post_id: number
  user: {
    username: string
  }
}

export interface ICommentUpdateData {
  content: string
}
