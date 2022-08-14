import {ActionTypes} from "./constants";
import {Post, Toast} from "./types/stateType";
import * as ActionCreatorsType from './types/actionCreatorsType'

export const AddPostAction:(post: Partial<Post>) => ActionCreatorsType.AddPostType = post => ({
    type: ActionTypes.ADD_POST,
    post
});

export const deletePostAction:(postId: number) => ActionCreatorsType.DeletePostType = postId => ({
    type: ActionTypes.DELETE_POST,
    postId
});

export const UpdatePostAction:(post: Partial<Post>) => ActionCreatorsType.UpdatePostType = post => ({
    type: ActionTypes.UPDATE_POST,
    post
});

export const FetchAllPostAction:() => ActionCreatorsType.FetchAllPostType = () => ({
    type: ActionTypes.FETCH_POSTS
})

export const FetchAllPostSuccessAction:(posts: Post[]) => ActionCreatorsType.FetchAllPostSuccessType = posts => ({
    type: ActionTypes.FETCH_POSTS_SUCCESS,
    posts
});

export const SetLoadingAction:(status: boolean)=> ActionCreatorsType.SetLoadingType = status => ({
    type: ActionTypes.LOADING,
    status
})

export const getPostAction:(postId: number) => ActionCreatorsType.GetPostType = postId => ({
    type: ActionTypes.GET_POST,
    postId
});

export const getPostSuccessAction:(post: Post) => ActionCreatorsType.GetPostSuccessType = post => ({
    type: ActionTypes.GET_POST_SUCCESS,
    post
});

export const setToastAction:(toast: Toast[]) => ActionCreatorsType.SetToastType = toast => ({
    type: ActionTypes.SET_TOAST,
    toast
});
