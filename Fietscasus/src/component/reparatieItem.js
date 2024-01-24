import {css, html, LitElement} from "lit";
import {ReparatieService} from "../service/reparatieService.js";

export class ReparatieItem extends LitElement{
    static get properties(){
        return {
            id: {type: String}
        }
    }

    constructor() {
        super();

        this.reparatieService = new ReparatieService();

        this.id = '';
        this.reparatie = '';
    }

    _reparatieHtml(){
        this.reparatie =  this.reparatieService.getReparatie(this.id);
        if (this.reparatie !== undefined){
            return html`
                <p>Voertuigsoort: ${this.reparatie.voertuig}</p>
                <p>Datum gebracht: ${this.reparatie.datum}</p>
                <p>Reparaties: ${this.reparatie.reparaties.join(", ")}</p>
                <p>Info: ${this.reparatie.info}</p>
                <p>Status: ${this.reparatie.status}</p>
        `
        }
    }

    render() {
        return html`
            <div id="maindiv">
                ${this._reparatieHtml()}
            </div>
        `
    }

    static get styles(){
        return css`
            #maindiv{
              border: 2px solid black;
              width: 300px;
              height: auto;
              padding: 10px;
              margin: 10px;
            }
        
        `
    }
}

customElements.define("reparatie-item", ReparatieItem);