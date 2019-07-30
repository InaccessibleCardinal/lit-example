import * as C from '../actionTypes';

const initialState = {
    user: null,
    loading: false,
    error: null
};

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case C.FETCH_USER: {
            return {...state, loading: true};
        }
        case C.FETCH_USER_FAILURE: {
            return {...state, loading: false, error: action.payload};
        }
        case C.FETCH_USER_SUCCESS: {
            return {...state,loading: false, user: action.payload};
        }
        default: {
            return state
        }
    }
}