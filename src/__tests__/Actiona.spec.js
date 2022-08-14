import * as Actions from "../actions"
import  {ActionTypes} from "../constants"


describe("Test Actions", () => {
    it("Should return action of type ADD_POST", () => {
        const post = {
            userId: 1,
            id: 2,
            title: "someTitle",
            body: "body"
        }
        const expected = {
            type: ActionTypes.ADD_POST,
            post
        }
        expect(Actions.AddPostAction(post)).toEqual(expected)
    })

    it("Should return action of type DELETE_POST", () => {
        const postId = 1
        const expected = {
            type: ActionTypes.DELETE_POST,
            postId
        }
        expect(Actions.deletePostAction(postId)).toEqual(expected)
    })

    it("Should return action of type UPDATE_POST", () => {
        const post = {
            userId: 1,
            id: 2,
            title: "someTitle",
            body: "body"
        }
        const expected = {
            type: ActionTypes.UPDATE_POST,
            post
        }
        expect(Actions.UpdatePostAction(post)).toEqual(expected)
    })

    it("Should return action of type FETCH_POSTS", () => {
        const expected = {
            type: ActionTypes.FETCH_POSTS,
        }
        expect(Actions.FetchAllPostAction()).toEqual(expected)
    })

    it("Should return action of type LOADING", () => {
        const status = true
        const expected = {
            type: ActionTypes.LOADING,
            status
        }
        expect(Actions.SetLoadingAction(status)).toEqual(expected)
    })

    it("Should return action of type GET_POST", () => {
        const postId = 1
        const expected = {
            type: ActionTypes.GET_POST,
            postId
        }
        expect(Actions.getPostAction(postId)).toEqual(expected)
    })

    it("Should return action of type GET_POST_SUCCESS", () => {
        const post = {
            userId: 1,
            id: 2,
            title: "someTitle",
            body: "body"
        }
        const expected = {
            type: ActionTypes.GET_POST_SUCCESS,
            post
        }
        expect(Actions.getPostSuccessAction(post)).toEqual(expected)
    })

    it("Should return action of type SET_TOAST", () => {
        const toast = {
            type: "FAILURE",
            message: "Error while processing"
        }
        const expected = {
            type: ActionTypes.SET_TOAST,
            toast
        }
        expect(Actions.setToastAction(toast)).toEqual(expected)
    })
})