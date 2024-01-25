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
    }

    _reparatieHtml(){
        const reparatie = this.reparatieService.getReparatie(this.id);

        if (reparatie !== undefined){
            return html`
                <p>Voertuigsoort: ${reparatie.voertuig}</p>
                <p>Datum gebracht: ${reparatie.datum}</p>
                <p>Reparaties: ${reparatie.reparaties.join(", ")}</p>
                <p>Info: ${reparatie.info}</p>
                <p>Status: ${reparatie.status}</p>
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