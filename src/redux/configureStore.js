import {createStore, combineReducers} from 'redux';
import formReducer from './reducers/formReducer';

let reducer = combineReducers({
    formState: formReducer
});

let middleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducer, middleware);