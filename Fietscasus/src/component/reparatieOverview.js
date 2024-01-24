import {css, html, LitElement} from "lit";
import {ReparatieService} from "../service/reparatieService.js";
import {ReparatieItem} from "./reparatieItem.js";
import {ReparatieEdit} from "./reparatieEdit.js";


export class ReparatieOverview extends LitElement{
    constructor() {
        super();

        this.reparatieService = new ReparatieService();
        this.allReparaties = this.reparatieService.getAllReparaties();
    }

    render() {
        return html`
            <div id="overviewDiv">
                ${this._renderReparaties()}
            </div>
            
        `
    }

    _renderReparaties(){
        const renderedReparaties = [];

        this.allReparaties.forEach(reparatie => {
            renderedReparaties.push(html`
                <div id="reparatieDiv">
                    <reparatie-item id="${reparatie.id}"></reparatie-item>
                    <button @click="${() => this._handleDelete(reparatie.id)}">Verwijderen</button>
                    <reparatie-edit id="${reparatie.id}"></reparatie-edit>
                </div>
            `)
        })

        return renderedReparaties;
    }

    _handleDelete(id){
        this.reparatieService.deleteReparatie(id);
        this.allReparaties = this.reparatieService.getAllReparaties();
        this.requestUpdate();
    }

    static get styles(){
        return css`
            #reparatieDiv{
              border: 2px solid black;
              width: 345px;
              height: auto;
              padding: 10px;
              margin: 10px;
            }
        
        `
    }
}

customElements.define("reparatie-overview", ReparatieOverview);