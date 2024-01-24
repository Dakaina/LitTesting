import {html, LitElement} from "lit";
import {ReparatieItem} from "./reparatieItem.js";

export class ReparatieSearch extends LitElement{
    static get properties(){
        return {
            id: {type: String}
        }
    }

    constructor() {
        super();

        this.id = '';
    }

    render() {
        return html`
            <div id="maindiv">
                <label for="idInput">Id:</label>
                <input type="text" id="idInput", name="id" @keyup="${this._handleInput}">
                <reparatie-item id="${this.id}"></reparatie-item>
            </div>
        `
    }

    _handleInput(event){
        const {name, value} = event.target;
        this[name] = value;
    }
}

customElements.define("reparatie-search", ReparatieSearch);