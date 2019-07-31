import {LitElement, html, css} from 'lit-element';
import './components/UserInfo';
import './components/SelectTag';
import './components/RadioGroup';
import './components/Checkbox';
import './components/TextInput';


const options1 = [
    {value: '', label: ''}, 
    {value: 'abc', label: 'ABC'},
    {value: 'bbb', label: 'BBB'},
    {value: 'ccc', label: 'CCC'}
];
const options2 = [
    {value: '', label: ''}, 
    {value: '111', label: 'One'},
    {value: '222', label: 'Two'},
    {value: '333', label: 'Three'},
    {value: '444', label: 'Four'},
    {value: '555', label: 'Five'}
];

const myRadiosConfig = [
    {value: 'Y', name: 'radio1', label: 'Yes'},
    {value: 'N', name: 'radio1', label: 'No'},
    {value: 'M', name: 'radio1', label: 'Maybe'}
];

export class WcApp extends LitElement {

    static get properties() {
        return {
            toggleBoolean: {type: Boolean}
        };
    }

    constructor() {
        super();
        this.toggleBoolean = true;
    }

    toggle(e) {
        e.preventDefault();
        this.toggleBoolean = !this.toggleBoolean;
    }

    renderConditionalField() {
        if (this.toggleBoolean) {
            return html`
                <text-input
                    id="text_2"
                    fieldLabel="My Conditional Text Input"
                    fieldName="text2"
                >
                </text-input>
            `;
        } else {
            return html``;
        }
    }

    render() {

        return html`<style>
            ${topLevelStyles()}
        </style>
        <user-info></user-info>
        <div class="form-wrapper">
            <form>
            <div>
                <h1>Web Form Sample</h1>
            </div>
                <div class="form-flex-row">
                    <div class="form-flex-cell">
                        <select-tag 
                            id="select_1"
                            fieldLabel="Select 1" 
                            fieldName="selector1" 
                            .options="${options1}"
                        ></select-tag>
                    </div>
                    <div class="form-flex-cell">
                        <select-tag 
                            id="select_2"
                            fieldLabel="Select 2" 
                            fieldName="selector2" 
                            .options="${options2}"
                        ></select-tag>
                    </div>
                </div>
                <radio-group
                    fieldLabel="My Radios" 
                    fieldName="radio1" 
                    .radiosConfig=${myRadiosConfig}
                >
                </radio-group>
                <checkbox-el
                    id="checkbox_1"
                    fieldLabel="My 1st Checkbox"
                    fieldName="checkbox1"
                    fieldValue="${true}"
                >
                </checkbox-el>
                <checkbox-el
                    id="checkbox_2"
                    fieldLabel="My 2nd Checkbox"
                    fieldName="checkbox2"
                    fieldValue="somevalue"
                >
                </checkbox-el>
                <text-input
                    id="text_1"
                    fieldLabel="My Text Input"
                    fieldName="text1"
                >
                </text-input>
                <div>
                <button @click="${this.toggle}">Toggle</button>
                </div>
                ${this.renderConditionalField()}               
            </form>
        </div>
        `;
    }
}

customElements.define('wc-app', WcApp);

function topLevelStyles() {
    return css`
        .form-wrapper {
            background-color: #d7d7d7;
        }
        h1 {font-family: sans-serif; font-weight: 100; color: #333;}
        .form-flex-row {
            display: flex;
            justify-content: space-between;
        }
        .form-flex-cell {
            flex: 1;
        }
    `;
}
