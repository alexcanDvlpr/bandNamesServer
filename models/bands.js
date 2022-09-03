const Band = require("./band");


class Bands {

    constructor() {
        this.bands = [];
        this.init();
    }

    init() {
        this.addBand(new Band("ACDC"))
        this.addBand(new Band("Sabaton"))
        this.addBand(new Band("Mägo de Oz"))
        this.addBand(new Band("Lepoka"))
    }

    addBand(band) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    removeBand(bandId) {
        this.bands = this.bands.filter(band => band.id !== bandId);
        return this.bands;
    }

    voteBand(bandId) {
        this.bands = this.bands.map(band => {
            if (band.id === bandId) {
                band.votes++;
            }
            return band;
        })
    }

}

module.exports = Bands;