import {Post, Toast} from './stateType';
import {ActionTypes} from '../constants'

export interface AddPostType {
    type: string,
    post: Partial<Post>
}

export interface DeletePostType {
    type: string,
    postId: number
}

export interface UpdatePostType {
    type: string,
    post: Partial<Post>
}

export interface FetchAllPostType {
    type: string
}

export interface FetchAllPostSuccessType {
    type: ActionTypes.FETCH_POSTS_SUCCESS,
    posts: Post[]
}

export interface SetLoadingType {
    type: ActionTypes.LOADING,
    status: boolean
}

export interface GetPostType {
    type: ActionTypes.GET_POST,
    postId: number
}

export interface GetPostSuccessType {
    type: ActionTypes.GET_POST_SUCCESS,
    post: Post
}

export interface SetToastType {
    type: ActionTypes.SET_TOAST,
    toast: Toast[]
}
