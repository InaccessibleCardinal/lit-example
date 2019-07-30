import {LitElement} from 'lit-element';

export function connect(storeObj) {

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