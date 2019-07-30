import {LitElement, html, css} from 'lit-element';
import store from './redux/configureStore';
import './components/SelectTag';
import './components/RadioGroup';
import request from './redux/actions/request';

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
    {value: '444', label: 'four'},
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
            store: {type: Object},
            loading: {type: Boolean}
        };
    }

    constructor() {
        super();
        this.store = store;
        this.storeState = store.getState();
    }

    // connectedCallback() {
    //     super.connectedCallback();
    // }

    render() {

        return html`<style>
            ${topLevelStyles()}
        </style>
        <user-info 
            .getState="${this.store.getState}"
            .dispatch="${this.store.dispatch}"
        >
        </user-info>
        <div class="form-wrapper">
            <form>
            <div>
                <h1>Web Form Sample</h1>
            </div>
                <div class="form-flex-row">
                    <div class="form-flex-cell">
                        <select-tag 
                            .store="${this.store}" 
                            fieldLabel="Select 1" 
                            fieldName="selector1" 
                            .options="${options1}"
                        ></select-tag>
                    </div>
                    <div class="form-flex-cell">
                        <select-tag 
                            .store="${this.store}" 
                            fieldLabel="Select 2" 
                            fieldName="selector2" 
                            .options="${options2}"
                        ></select-tag>
                    </div>
                </div>
                <radio-group 
                    .store="${this.store}" 
                    fieldLabel="My Radios" 
                    fieldName="radio1" 
                    .radiosConfig=${myRadiosConfig}
                >
                </radio-group>
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

function getUser(state) {
    return state.services.user;
}

class UserInfo extends connect(store)(LitElement) {
    static get properties() {
        return {
            user: {type: Object},
            dispatch: {type: Function}
        };
    }
    constructor() {
        super();
        this.user = null;
    }

    stateChanged(state) {
        this.user = getUser(state);
    }

    connectedCallback() {
        super.connectedCallback();
        let {dispatch} = this;
        dispatch({type: 'FETCH_USER'});
        request({url: 'http://jsonplaceholder.typicode.com/users/2', method: 'GET'})
        .then(d => {
            dispatch({type: 'FETCH_USER_SUCCESS', payload: d});
        });
    }

    render() {
        return html`
            <pre>${JSON.stringify(this.user, null, 2)}</pre>
        `;
    }
}
customElements.define('user-info', UserInfo);

function connect(storeObj) {

    return function(Component) {

        return class extends LitElement {

            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback();
                }
                this._storeUnsubscribe = storeObj.subscribe(() => this.stateChanged(storeObj.getState()));
                this.stateChanged(storeObj.getState());
            }

            disconnectedCallback() { //tear down
                this._storeUnsubscribe();
                if (super.disconnectedCallback) {
                  super.disconnectedCallback();
                }
            }

        }
    }

}