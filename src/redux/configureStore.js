import {createStore, combineReducers} from 'redux';
import formReducer from './reducers/formReducer';
import serviceReducer from './reducers/serviceReducer';

let reducer = combineReducers({
    formState: formReducer,
    services: serviceReducer
});

let middleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducer, middleware);