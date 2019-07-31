import {LitElement, html, css} from 'lit-element';
import store from '../redux/configureStore';
import {connect} from '../redux/connect';

export default class TextInput extends connect(store)(LitElement) {

    static get properties() {
        return {
            fieldName: {type: String},
            fieldLabel: {type: String},
            id: {type: String}
        };
    }

    constructor() {
        super();
        this.dispatch = store.dispatch;
    }

    stateChanged(state) {}

    connectedCallback() {
        super.connectedCallback();
        this.dispatch({type: 'REGISTER_FIELD', payload: this.fieldName});
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispatch({type: 'UNREGISTER_FIELD', payload: this.fieldName});
    }

    changeHandler(e) {
        this.dispatch({
            type: 'UPDATE_FORM_FIELD', 
            payload: {value: e.target.value, field: this.fieldName}
        });
    }

    render() {
        let {changeHandler, fieldLabel, fieldName, id} = this;
        return html`<style>
                ${inputStyle()}
            </style>
            <div class="text-input-wrapper">
                <label class="text-input-label" for="${fieldName}">${fieldLabel}</label>
                <input id="${id}" class="text-input" type="text" @keyup="${changeHandler}" />
            </div>
        `;
    }
}

customElements.define('text-input', TextInput);

function inputStyle() {
    return css`
        .text-input-wrapper {
            background-color: #fff;
            padding: 1em;
            font-family: sans-serif;
        }
        .text-input-label {
            display: block;
            padding: 0.8em 0;
        }
        .text-input {
            padding: 0.8em;
            display: block;
            border: none;
            width: 80%;
            font-size: 1em;
            outline: 1px solid #d8d8d8;
        }
        .text-input:focus {
            outline: 4px solid #5588dd;
        }
    `;
}