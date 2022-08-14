export type State = {
    posts : Post[],
    loading: boolean,
    post: Post,
    toast: Toast[]
}

export type Toast = {
  type: 'FAILURE' | 'SUCCESS',
  message: string
}

export type Post = {
    userId: number;
    id: number,
    title: string,
    body: string
}
