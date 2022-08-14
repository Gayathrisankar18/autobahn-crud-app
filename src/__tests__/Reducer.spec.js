import {PostReducer, initialState} from '../reducer';
import * as Actions from "../actions"

describe("Test Reducers", () => {
    it("Should return initial state of application", () => {
        expect(PostReducer(undefined, {})).toEqual(initialState)
    });

    it("Should update posts", () => {
        const posts = [{userId: 1,
            id: 2,
            title: 'title text',
            body: 'body text'}]
        const action = Actions.FetchAllPostSuccessAction(posts)
        const expected = {...initialState, posts}
        expect(PostReducer(undefined, action)).toEqual(expected)
    });

    it("Should update loading", () => {
        const status = true
        const action = Actions.SetLoadingAction(status)
        const expected = {...initialState, loading: true}
        expect(PostReducer(undefined, action)).toEqual(expected)
    });

    it("Should update post", () => {
        const post = {userId: 1,
            id: 2,
            title: 'title text',
            body: 'body text'}
        const action = Actions.getPostSuccessAction(post)
        const expected = {...initialState, post}
        expect(PostReducer(undefined, action)).toEqual(expected)
    });

    it("Should update toast", () => {
        const toast = {
            type: 'FAILURE',
            message: 'message text'
          }
        const action = Actions.setToastAction(toast)
        const expected = {...initialState, toast}
        expect(PostReducer(undefined, action)).toEqual(expected)
    });
})