export class Reparatie {
    constructor(voertuig, reparaties, info, datum, status) {
        this.datum = datum;
        this.status = status.status;
        this.voertuig = voertuig;
        this.reparaties = reparaties;
        this.info = info;
        this.id = crypto.randomUUID()
    }
}