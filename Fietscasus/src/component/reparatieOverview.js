import {css, html, LitElement} from "lit";
import {ReparatieService} from "../service/reparatieService.js";
import {ReparatieItem} from "./reparatieItem.js";
import {ReparatieEdit} from "./reparatieEdit.js";


export class ReparatieOverview extends LitElement{
    static get properties(){
        return{
            allReparaties: {type: Array}
        }
    }

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
        const template = document.querySelector("#reparatieTemplate").content

        this.allReparaties.forEach(reparatie => {
            const section = document.createElement("section");
            section.innerHTML = `
                <span slot="voertuig">${reparatie.voertuig}</span>
                <span slot="datum">${reparatie.datum}</span>
                <span slot="reparaties">${reparatie.reparaties.join(", ")}</span>
                <span slot="info">${reparatie.info}</span>
                <span slot="status">${reparatie.status}</span>
                <button slot="delete">Verwijderen</button>
                <reparatie-edit slot="edit" id="${reparatie.id}"></reparatie-edit>
            `

            const verwijderButton = section.querySelector('button[slot="delete"]');
            verwijderButton.addEventListener('click', () => {
                this._handleDelete(reparatie.id);
            });

            const editButton = section.querySelector('reparatie-edit[slot="edit"]');
            editButton.addEventListener('update-submit', this._handleUpdate.bind(this));

            section.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true))
            renderedReparaties.push(section)
        })

        return renderedReparaties;
    }

    _handleUpdate() {
        this.allReparaties = this.reparatieService.getAllReparaties();
        this.requestUpdate();
    }

    _handleDelete(id) {
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