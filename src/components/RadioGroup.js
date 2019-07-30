import {LitElement, html, css} from 'lit-element';
import store from '../redux/configureStore';
import {connect} from '../redux/connect';

export default class RadioGroup extends connect(store)(LitElement) {
    static get properties() {
        return {
            fieldName: {type: String},
            fieldLabel: {type: String},
            radiosConfig: {type: Array}
        };
    }

    constructor() {
        super();
        this.fieldName = '';
        this.fieldLabel = '';
        this.radiosConfig = [];
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

    onChange(value) {
        this.dispatch({
            type: 'UPDATE_FORM_FIELD', 
            payload: {value: value, field: this.fieldName}
        });
    }

    render() {
        
        return html`<style>
                ${radioStyle()}
            </style>
            <div>
                <label class="radio-field-label" for="radio1">${this.fieldLabel}</label>
                ${this.radiosConfig.map(conf => {
                    return html`${Radio(conf, this.onChange)}`;
                })}
            </div>
        `;
    }
}
customElements.define('radio-group', RadioGroup);

function Radio(config, changeHandler) {
    let {label, value, name} = config;
    return html`
        <span class="radio-label">${label}</span>
        <input class="radio" @change="${() => changeHandler(value)}" type="radio" name="${name}" value="${value}"/>
    `;
}

function radioStyle() {
    return css`
        .radio-field-label {
            display: block;
            font-size: 1.2em;
            font-weight: 500;
            font-family: sans-serif;
            padding: 0.5em;
        }
        .radio-label {
            font-size: 1em;
            font-weight: 500;
            font-family: sans-serif;
            padding: 0.5em;
        }
        .radio {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 2px solid #777;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transition: all 250ms;
            cursor: pointer;
        }
        .radio:checked {
            border: 4px solid #5588dd;
        }
        .radio:focus {
            outline: none;
        }
    `;
}