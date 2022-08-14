import {put, PutEffect, StrictEffect, takeLatest} from 'redux-saga/effects';
import {ActionTypes} from "./constants";
import {Post} from './types/stateType'
import {setToastAction, getPostSuccessAction, FetchAllPostSuccessAction, SetLoadingAction, FetchAllPostAction} from './actions'
import {DeletePostType, GetPostType, AddPostType, UpdatePostType} from './types/actionCreatorsType';
export interface ResponseGenerator{
    body?:any,
    bodyUsed?:boolean,
    headers?:any,
    ok?:boolean,
    status?:number,
    redirected?:string | boolean,
    statusText?:string,
    type?:string,
    url?:string,
    json: () => Promise<Post> | Promise<Post>[];
}

// workers
export function* fetchAllPostAction(): Generator<PutEffect | Promise<Response> | ResponseGenerator> {
    try {
        yield put(SetLoadingAction(true))
        let response: any = yield fetch(`${ActionTypes.BASE_URL}`)
        response = yield response.json()
        yield(put(FetchAllPostSuccessAction(response)))
        yield put(SetLoadingAction(false))
    }
    catch(e) {
        console.log('Error while fetching Posts', e)
        yield put(SetLoadingAction(false))
    }
}

export function* addPostAction(action: AddPostType): Generator<PutEffect | Promise<Response> | ResponseGenerator> {
    try {
        yield put(SetLoadingAction(true))
        yield fetch(`${ActionTypes.BASE_URL}`, {
            method: 'POST',
            body: JSON.stringify(action.post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }})
        yield(put(setToastAction([{type: 'SUCCESS', message: 'Successfully added the post'}])))
        // after adding post to server, getting all posts from server again instead of from local store to have our state in sync with server
        yield(put(FetchAllPostAction()))
        yield put(SetLoadingAction(false))
    }
    catch(e) {
        console.log('Error while adding Posts', e)
        yield(put(setToastAction([{type: 'FAILURE', message: 'Error: adding the post'}])))
        yield put(SetLoadingAction(false))
    }
}

export function* updatePostAction(action: UpdatePostType): Generator<PutEffect | Promise<Response> | ResponseGenerator> {
    try {
        yield put(SetLoadingAction(true))
        yield fetch(`${ActionTypes.BASE_URL}/${action.post.id}`, {
            method: 'PUT',
            body: JSON.stringify(action.post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }})
        yield(put(setToastAction([{type: 'SUCCESS', message: 'Successfully updated the post'}])))
        yield(put(FetchAllPostAction()))
        yield put(SetLoadingAction(false))
    }
    catch(e) {
        console.log('Error while updating Posts', e)
        yield(put(setToastAction([{type: 'FAILURE', message: 'Error: updating the post'}])))
        yield put(SetLoadingAction(false))
    }
}

export function* deletePostAction(action: DeletePostType): Generator<PutEffect | Promise<Response> | ResponseGenerator> {
    try {
        yield put(SetLoadingAction(true))
        yield fetch(`${ActionTypes.BASE_URL}/${action.postId}`, {
            method: 'DELETE'
        })
        yield(put(setToastAction([{type: 'SUCCESS', message: 'Successfully deleted the post'}])))
        yield(put(FetchAllPostAction()))
        yield put(SetLoadingAction(false))
    }
    catch(e) {
        console.log('Error while deleting Posts', e)
        yield(put(setToastAction([{type: 'FAILURE', message: 'Error: deleting the post'}])))
        yield put(SetLoadingAction(false))
    }
}

export function* getPostAction(action: GetPostType): Generator<PutEffect | Promise<Response> | ResponseGenerator> {
    try {
        yield put(SetLoadingAction(true))
        let response: any = yield fetch(`${ActionTypes.BASE_URL}/${action.postId}`)
        response = yield response.json()
        yield(put(getPostSuccessAction(response)))
        yield put(SetLoadingAction(false))
    }
    catch(e) {
        console.log('Error while a Post', e)
        yield put(SetLoadingAction(false))
    }
}


//watchers
export default function* rootSaga(): Generator<StrictEffect> {
    yield takeLatest(ActionTypes.ADD_POST, addPostAction)
    yield takeLatest(ActionTypes.FETCH_POSTS, fetchAllPostAction)
    yield takeLatest(ActionTypes.DELETE_POST, deletePostAction)
    yield takeLatest(ActionTypes.UPDATE_POST, updatePostAction)
    yield takeLatest(ActionTypes.GET_POST, getPostAction)
}
