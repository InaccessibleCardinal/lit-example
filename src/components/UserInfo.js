import {LitElement, html, css} from 'lit-element';
import store from '../redux/configureStore';
import {connect} from '../redux/connect';
import request from '../redux/actions/request';

export default function getUser(state) {
    return state.services.user;
}

class UserInfo extends connect(store)(LitElement) {
    static get properties() {
        return {
            user: {type: Object}
        };
    }
    constructor() {
        super();
        this.user = null;
        this.dispatch = store.dispatch;
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
        if (this.user) {
            let {name, username, email, phone} = this.user;
            return html`<style>
                ${userStyle()}
            </style>
            <div class="user-info-wrapper">
                <div class="user-info-cell">
                    <span>Name: </span><span>${name}</span>
                </div>
                <div class="user-info-cell">
                    <span>Username: </span><span>${username}</span>
                </div>
                <div class="user-info-cell">
                    <span>E-mail: </span><span>${email}</span>
                </div>
                <div class="user-info-cell">
                    <span>Phone: </span><span>${phone}</span>
                </div>
            </div>
            `;
        }
        return html`<p>Loading...</p>`;
    }
}
customElements.define('user-info', UserInfo);

function userStyle() {
    return css`
        .user-info-wrapper {
            background-color: #303058;
            color: #fff;
            width: 100%;
            height: 90px;
            display: flex;
            justify-content: space-between;
        }
        .user-info-cell {
            flex: 1;
            padding: 1em;
            height: 90px;
            font-family: sans-serif;
        }
        .user-info-cell span {
            display: block;
        }
    `;
}