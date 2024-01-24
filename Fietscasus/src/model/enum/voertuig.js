export class Voertuig {
    static Fiets = new Voertuig("Fiets");
    static Scooter = new Voertuig("Scooter");

    constructor(voertuig) {
        this.voertuig = voertuig;
    }
}