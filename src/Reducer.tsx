import {FetchAllPostSuccessType, SetLoadingType, GetPostSuccessType, SetToastType} from './types/actionCreatorsType';
import {ActionTypes} from "./constants";
import {State, Post} from "./types/stateType";

type PostActionType = FetchAllPostSuccessType | SetLoadingType | GetPostSuccessType | SetToastType

export const initialState: State = {
    posts: [],
    loading: false,
    post: {} as Post,
    toast: []
};
  
  export const PostReducer:(state: State | undefined, action: PostActionType) => State = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.FETCH_POSTS_SUCCESS:
        return { ...state, posts: action.posts };
      case ActionTypes.LOADING:
        return { ...state, loading: action.status };
      case ActionTypes.GET_POST_SUCCESS:
        return {...state, post: action.post}
      case ActionTypes.SET_TOAST:
        return {...state, toast: action.toast}
      default:
        return state;
    }
  };
  