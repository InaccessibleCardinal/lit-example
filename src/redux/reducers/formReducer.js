import * as C from '../actionTypes';
const initialState = {fields: {}};


export default function formReducer(state = initialState, action) {
    switch (action.type) {
        case C.REGISTER_FIELD: {
            let newFields = {...state.fields};
            newFields[action.payload] = {};
            return {...state, fields: newFields};
        }
        case C.UNREGISTER_FIELD: {
            let newFields = {};
            Object.keys(state.fields).forEach(f => {
                if (f !== action.payload) {
                    newFields[f] = state.fields[f]
                }
            });
            return {...state, fields: newFields};
        }
        case C.SELECT_ITEM: {
            let {field, value} = action.payload;
            let newFields = {...state.fields};
            newFields[field].value = value;
            return {...state, fields: newFields};
        }
        case C.UPDATE_FORM_FIELD: {
            let {field, value} = action.payload;
            let newFields = {...state.fields};
            newFields[field].value = value;
            return {...state, fields: newFields};
        }
        default: {
            return state;
        }
    }
}
