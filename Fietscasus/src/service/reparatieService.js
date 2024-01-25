import {Reparatie} from "../model/reparatie.js";
import {Status} from "../model/enum/status.js";

export class ReparatieService{

    constructor() {
        this.LOCAL_STORAGE_KEY = '_reparaties'
        this.reparaties = [];
        this._loadAllReparaties();
    }

    _loadAllReparaties(){
        const reparaties = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        this.reparaties = JSON.parse(reparaties);

        if (this.reparaties === null) {
            this.reparaties = [];
        }
    }

    async _saveAllReparaties(){
        const reparatiesString = JSON.stringify(this.reparaties)
        await localStorage.setItem(this.LOCAL_STORAGE_KEY, reparatiesString)
    }

    addReparatie(voertuig, reparaties, datum, status){
        const reparatie = new Reparatie(voertuig, reparaties, "", datum, status)
        this.reparaties.push(reparatie);

        this._saveAllReparaties()
    }

    getReparatie(id){
        for (const reparatie of this.reparaties) {
            if (reparatie.id === id) {
                return reparatie;
            }
        }
    }

    getAllReparaties(){
        this._loadAllReparaties()
        return this.reparaties;
    }

    updateReparatie(id, voertuig, reparaties, info, datum, status){
        this.reparaties.forEach(reparatie => {
            if (reparatie.id === id) {

                reparatie.voertuig = voertuig;
                reparatie.reparaties = reparaties;
                reparatie.info = info;
                reparatie.datum = datum;
                reparatie.status = status;
            }
        });
        this._saveAllReparaties();
    }

    deleteReparatie(id){
        this.reparaties = this.reparaties.filter(reparatie => reparatie.id !== id)
        this._saveAllReparaties()
    }
}