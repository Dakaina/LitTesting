import {html, LitElement} from "lit";

export class NameShower extends LitElement{
    static get properties(){
        return {
            id: {type: String, reflect: false},
            name: {type: String, reflect: true}
        }
    }

    constructor() {
        super();

        this.id = 'id'
        this.name = 'naam'
    }

    _changeProperty(){
        //Changes naar de property wordt niet gemirrored naar de html attribute want reflect is false
        this.id = "Dont reflect"

        //Changes naar de property wordt wel gemirrored naar de html attribute want reflect is true
        this.name = "Reflect"
    }

    render(){
        return html`
            id: ${this.id}
            name: ${this.name}
            <button @click="${this._changeProperty}">Click me</button>
        `
    }
}

customElements.define("name-shower", NameShower)