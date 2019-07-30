import {LitElement, html, css} from 'lit-element';
import store from '../redux/configureStore';
import {connect} from '../redux/connect';

export default class SelectTag extends connect(store)(LitElement) {
    static get properties() {
        return {
            fieldLabel: {type: String},
            fieldName: {type: String},
            options: {type: Array}
        };
    }

    constructor() {
        super();
        this.fieldName = '';
        this.fieldLabel = '';
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

    handleSelect(e) {
        this.dispatch({
            type: 'UPDATE_FORM_FIELD', 
            payload: {value: e.target.value, field: this.fieldName}
        });
    }

    render() {
        return html`<style>
            ${selectTagStyle()}
        </style>
            <div class="select-tag-wrapper">
                <label class="select-label" for="${this.fieldName}">${this.fieldLabel}</label>
                <select class="select-tag" @change="${this.handleSelect}">
                ${this.options.map(o => {
                    let {value, label} = o;
                    return html`<option value="${value}">${label}</option>`;
                })}
                </select>
            </div>
        `;
    }

}
customElements.define('select-tag', SelectTag);

function selectTagStyle() {
    return css`
    .select-tag-wrapper {
        width: 100%;
        padding: 0;
        border: 1px solid #777;
    }
    .select-tag {
        width: 100%;
        padding: 1em;
        border: none;
        color: #333;
        font-size: 1.1em;
        transition: all 250ms;
    }
    .select-tag:hover {
        outline: 4px solid #5588dd;
        cursor: pointer;
    }
    .select-tag:focus {
        outline: 4px solid #5588dd;
    }
    .select-label {
        display: block;
        font-size: 1.2em;
        font-weight: 500;
        font-family: sans-serif;
        padding: 0.5em;
    }
    `;
}