import * as Saga from '../saga';
import * as Actions from "../actions";
import {put, takeLatest} from 'redux-saga/effects';
import * as ActionTypes from '../constants'

describe("Test fetchAllPostAction Sagas", () => {
    const action = Actions.FetchAllPostAction()
    const response = {
        json: () => ([{
            userId: 1,
            id: 2,
            title: 'text sample',
            body: 'body sample'
        }])
    }
    
    
    it('Should call request fn with the correct URL', () => {
        const generator = Saga.fetchAllPostAction();
        expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(true)))
        expect(generator.next().value).toEqual(fetch(`${ActionTypes.BASE_URL}`))
        generator.next(response).value
        expect(generator.next(response.json()).value).toEqual(put(Actions.FetchAllPostSuccessAction(response.json())))
        expect(generator.next(response).value).toEqual(put(Actions.SetLoadingAction(false)))
        expect(generator.next().done).toBeTruthy()
    });

    it('Should set loading false if any error', () => {
        const generator = Saga.fetchAllPostAction();
        generator.next();
        generator.next();
expect(generator.throw(new Error()).value).toEqual(
    put(Actions.SetLoadingAction(false)))
    expect(generator.next().done).toBeTruthy()
})

});

describe("Test addPostAction Sagas", () => {
    
const post = {
    json: () => ([{
        userId: 1,
        title: 'text sample',
        body: 'body sample'
    }])
}
    const action = Actions.AddPostAction(post)
    
    it('Should call request fn with the correct URL', () => {
        const generator = Saga.addPostAction(action);
        expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(true)))
        expect(generator.next().value).toEqual(fetch(`${ActionTypes.BASE_URL}`, {
            method: 'POST',
            body: JSON.stringify(action.post),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }}))
        expect(generator.next(post.json()).value).toEqual(put(Actions.setToastAction([{type: 'SUCCESS', message: 'Successfully added the post'}])))
        expect(generator.next().value).toEqual(put(Actions.FetchAllPostAction()))
        expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
        expect(generator.next().done).toBeTruthy()
    });

    it('Should set loading false & add toast if any error', () => {
        const generator = Saga.addPostAction(action);
        generator.next();
        generator.next();
expect(generator.throw(new Error()).value).toEqual(
    put(Actions.setToastAction([{type: 'FAILURE', message: 'Error: adding the post'}])))
    expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
    expect(generator.next().done).toBeTruthy()
});

});

describe("Test updatePostAction Sagas", () => {
    
    const post = {
        json: () => ([{
            title: 'text sample',
            body: 'body sample'
        }])
    }
        const action = Actions.UpdatePostAction(post)
        
        it('Should call request fn with the correct URL', () => {
            const generator = Saga.updatePostAction(action);
            expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(true)))
            expect(generator.next().value).toEqual(fetch(`${ActionTypes.BASE_URL}/${action.post.id}`, {
                method: 'PUT',
                body: JSON.stringify(action.post),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                }}))
            expect(generator.next(post.json()).value).toEqual(put(Actions.setToastAction([{type: 'SUCCESS', message: 'Successfully updated the post'}])))
            expect(generator.next().value).toEqual(put(Actions.FetchAllPostAction()))
            expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
            expect(generator.next().done).toBeTruthy()
        });
    
        it('Should set loading false & add toast if any error', () => {
            const generator = Saga.updatePostAction(action);
            generator.next();
            generator.next();
    expect(generator.throw(new Error()).value).toEqual(
        put(Actions.setToastAction([{type: 'FAILURE', message: 'Error: updating the post'}])))
        expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
        expect(generator.next().done).toBeTruthy()
    });
    
    });

    describe("Test deletePostAction Sagas", () => {
    
        const response = {
            json: () => ([{
                id: 12,
                title: 'text sample',
                body: 'body sample'
            }])
        }

        const postId = 12
        const action = Actions.deletePostAction(postId)
            
            it('Should call request fn with the correct URL', () => {
                const generator = Saga.deletePostAction(action);
                expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(true)))
                expect(generator.next().value).toEqual(fetch(`${ActionTypes.BASE_URL}/${action.postId}`, {
                    method: 'DELETE',
                }))
                expect(generator.next(response.json()).value).toEqual(put(Actions.setToastAction([{type: 'SUCCESS', message: 'Successfully deleted the post'}])))
                expect(generator.next().value).toEqual(put(Actions.FetchAllPostAction()))
                expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
                expect(generator.next().done).toBeTruthy()
            });
        
            it('Should set loading false & add toast if any error', () => {
                const generator = Saga.deletePostAction(action);
                generator.next();
                generator.next();
        expect(generator.throw(new Error()).value).toEqual(
            put(Actions.setToastAction([{type: 'FAILURE', message: 'Error: deleting the post'}])))
            expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
            expect(generator.next().done).toBeTruthy()
        });
        
        });


        describe("Test getPostAction Sagas", () => {
    
            const response = {
                json: () => ([{
                    id: 12,
                    title: 'text sample',
                    body: 'body sample'
                }])
            }
    
            const postId = 12
            const action = Actions.getPostAction(postId)
                
                it('Should call request fn with the correct URL', () => {
                    const generator = Saga.getPostAction(action);
                    expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(true)))
                    expect(generator.next().value).toEqual(fetch(`${ActionTypes.BASE_URL}/${action.postId}`))
                    generator.next(response).value
                    expect(generator.next(response.json()).value).toEqual(put(Actions.getPostSuccessAction(response.json())))
                    expect(generator.next().value).toEqual(put(Actions.SetLoadingAction(false)))
                    expect(generator.next().done).toBeTruthy()
                });
            
                it('Should set loading false if any error', () => {
                    const generator = Saga.getPostAction(action);
                    generator.next();
                    generator.next();
            expect(generator.throw(new Error()).value).toEqual(
                put(Actions.SetLoadingAction(false)))
                expect(generator.next().done).toBeTruthy()
            });
            
            });

