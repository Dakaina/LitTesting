export class Status {
    static Wachtend= new Status("Wachtend");
    static Bezig = new Status("Bezig");
    static Afgerond = new Status("Afgerond");


    constructor(status) {
        this.status = status;
    }
}