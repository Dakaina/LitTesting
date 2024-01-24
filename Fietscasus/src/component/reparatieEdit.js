import {css, html, LitElement} from "lit";
import {ReparatieService} from "../service/reparatieService.js";
import {Status} from "../model/enum/status.js";

export class ReparatieEdit extends LitElement{
    static get properties(){
        return {
            id: {type: String},
            info: {type: String},
            status: {type: String}
        }
    }

    constructor() {
        super();

        this.reparatieService = new ReparatieService();
        this.reparatie = ''
        this.editWindow = false

        this.id = '';
        this.info = '';
        this.status = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this.reparatie = this.reparatieService.getReparatie(this.id);
    }

    render() {
        return html`
            <button @click="${this._handleEditWindow}">Bewerken</button>
            ${this.editWindow ? this._editWindow() : ""}
        `
    }

    _editWindow(){
        return html`
            <div id="editWindow">
                <form>
                    <label for="info">Info:</label>
                    <input type="text" name="info" id="info" .value="${this.reparatie.info}" @input="${this._handleInput}">
                    <label for="status">Status:</label>
                    <select id="status" name="status" @change="${this._handleChange}">
                        <option hidden="" .value="${this.reparatie.status}">${this.reparatie.status}</option>
                        <option value="Wachtend">Wachtend</option>
                        <option value="Bezig">Bezig</option>
                        <option value="Afgerond">Afgerond</option>
                    </select>
                    <button @click="${this._onSubmit}">Opslaan</button>
                </form>
            </div>
        `
    }

    _onSubmit(event){
        event.preventDefault()

        this.reparatieService.updateReparatie(this.reparatie.id, this.reparatie.voertuig ,this.reparatie.reparaties, this.info, this.reparatie.datum, Status[this.status].status);
        this._handleEditWindow();
    }

    _handleEditWindow(){
        this.editWindow = !this.editWindow;
        this.requestUpdate();
    }

    _handleInput(event){
        const {name, value} = event.target;
        this[name] = value;
    }

    _handleChange(event){
        const {name, value} = event.target;
        this[name] = value;
    }


    static get styles(){
        return css`
            #editWindow{
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);


              background-color: white;
              border: 2px solid black;
              
              width: 200px;
              height: 200px;
            }
        `
    }

}

customElements.define("reparatie-edit", ReparatieEdit);