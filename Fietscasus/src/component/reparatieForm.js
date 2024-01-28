import {html, LitElement} from "lit";
import {ReparatieService} from "../service/reparatieService.js";
import {Status} from "../model/enum/status.js";
import {Voertuig} from "../model/enum/voertuig.js";

export class ReparatieForm extends LitElement{
    static get properties(){
        return{
            datum: {type: String},
            status: {type: String},
            voertuig: {type: String},
            reparaties: {type: Array},
        }
    }

    constructor() {
        super();

        //Create van element
        console.log("Yay ik wordt gecreate")

        this.reparatieService = new ReparatieService();

        this.fietsReparaties = ["Voorband", "Achterband", "Ketting", "Remmen", "Zadel", "Lampen","Stuur", "Pedalen", "Frame", "Algehele check"]
        this.scooterReparaties = ["Banden", "Aandrijving", "Remmen", "Verlichting", "Motor", "Elektrisch", "Ophanging", "Stuur", "Sloten", "Algemene check"];


        this.datum = "";
        this.status = "";
        this.voertuig = "";
        this.reparaties = [];
    }

    connectedCallback() {
        super.connectedCallback();

        //Element in DOM gestopt
        console.log("Ik zit eindelijk in de dom :)")
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        //Element uit dom gehaald
        console.log("Verwijderd... :(")
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);

        //Opgeroepen na element zijn eerste render
        console.log("First update ever yesss")
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);

        //Elke update wordt dit aangeroepen
        console.log("Damn another update")
    }


    render(){
        //Dit is wat in de DOM wordt gestopt aan het begin en bij elke update weer wordt opgeroepen
        console.log("Ik kom in het begin en elke update weer voor :)")

        return html`
            <form id="form" @submit="${this._onSubmit}">
                <h2>Voertuigsoort: </h2>
                <label for="fiets">Fiets</label>
                <input type="radio" id="fiets" value="Fiets" name="voertuig" required @change="${this._handleVoertuigChange}">
                <label for="fiets">Scooter</label>
                <input type="radio" id="scooter" value="Scooter" name="voertuig" required @change="${this._handleVoertuigChange}">
                <hr>
                    ${this.voertuig === "Scooter" ? this._scooterForm() : ""}
                    ${this.voertuig === "Fiets" ? this._fietsForm() : ""}
                <label for="datum">Welke dag kom je langs:</label>
                <input type="date" id="datum" name="datum" required @input="${this._handleInput}">
                <button>Versturen</button>
            </form>
        `
    }

    _fietsForm(){
        let allCheckBox = [];

        this.fietsReparaties.forEach(reparatie => {
            const checkBox = [html`
                <label for="${reparatie}">${reparatie}</label>
                <input id="${reparatie}" .value="${reparatie}" type="checkbox" name="reparatieCheck" @change="${this._handleCheckboxChange}">
            `]
            allCheckBox.push(checkBox)
        })
        allCheckBox.push(html`<hr>`)

        return allCheckBox;
    }

    _scooterForm(){
        let allCheckBox = [];

        this.scooterReparaties.forEach(reparatie => {
            const checkBox = [html`
                <label for="${reparatie}">${reparatie}</label>
                <input id="${reparatie}" .value="${reparatie}" type="checkbox" name="reparatieCheck" @change="${this._handleCheckboxChange}">
            `]
            allCheckBox.push(checkBox)
        })
        allCheckBox.push(html`<hr>`)

        return allCheckBox;
    }

    _handleVoertuigChange(event){
        const {name, value} = event.target;
        this[name] = value;

        this.reparaties = [];

    }

    _handleCheckboxChange(event){
        const {checked, value} = event.target;

        if (checked){
            this.reparaties.push(value);
        }
        else {
            const newReparaties = this.reparaties.filter(reparatie => reparatie !== value);
            this.reparaties = newReparaties
        }
    }

    _handleInput(event){
        const {name, value} = event.target;
        this[name] = value;
    }

    _onSubmit(event){
        event.preventDefault();

        this.reparatieService.addReparatie(Voertuig[this.voertuig].voertuig, this.reparaties, this.datum, Status.Wachtend)

        const form = this.shadowRoot.querySelector("#form")
        form.reset();
        this.voertuig = '';
        this.reparaties = [];
        this.datum = '';
    }
}

customElements.define("reparatie-form", ReparatieForm);