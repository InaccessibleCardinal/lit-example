import {LitElement, html, css} from 'lit-element';
import store from '../redux/configureStore';
import {connect} from '../redux/connect';

export default class Checkbox extends connect(store)(LitElement) {
    static get properties() {
        return {
            fieldName: {type: String},
            fieldLabel: {type: String},
            fieldValue: {type: String|Boolean},
            id: {type: String}
        };
    }
    
    constructor() {
        super();
        this.fieldName = '';
        this.fieldLabel = '';
        this.dispatch = store.dispatch;
        this.onChange = this.onChange.bind(this);
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

    renderFieldLabel() {
        if (this.fieldLabel) {
            return html`<span>${this.fieldLabel}</span>`
        }
        return html``;
    }

    onChange(e) {
        let {checked, value} = e.target;
        if (checked) {
            this.dispatch({
                type: 'UPDATE_FORM_FIELD', 
                payload: {value: e.target.value, field: this.fieldName}
            });
        } else {
            this.dispatch({
                type: 'UPDATE_FORM_FIELD', 
                payload: {value: null, field: this.fieldName}
            });
        }
        
    }

    render() {
        let {fieldName, fieldValue, id, onChange} = this;
        return html`<style>
                ${checkboxStyle()}
            </style>
            <div class="checkbox-wrapper">
            <label class="checkbox-label">
                ${this.renderFieldLabel()}
                <input 
                    id="${id}"
                    class="checkbox" 
                    type="checkbox"
                    name="${fieldName}" 
                    value="${fieldValue}" 
                    @change="${onChange}"
                />
                <span class="checkmark"></span>
            </div>
        `;
    }
}
customElements.define('checkbox-el', Checkbox);

function checkboxStyle() {
    return css`
        .checkbox-wrapper {
            margin: 1em 0;
        }
        .checkbox-label {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            font-family: sans-serif;
            transition: all 250ms;
        }
        .checkbox-label span {
            line-height: 25px;
        }
        .checkbox-label input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }
        
        /* Create a custom checkbox */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #eee;
            transition: all 250ms;
        }
        
        /* On mouse-over, add a grey background color */
        .checkbox-label:hover input ~ .checkmark {
            background-color: #ccc;
        }
        
        /* When the checkbox is checked, add a blue background */
        .checkbox-label input:checked ~ .checkmark {
            background-color: #5588dd;
        }
        
        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }
        
        /* Show the checkmark when checked */
        .checkbox-label input:checked ~ .checkmark:after {
            display: block;
        }
        
        /* Style the checkmark/indicator */
        .checkbox-label .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    `;
}