const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();


// Sockets Messages
io.on('connection', client => {
    console.log("Cliente conectado")

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => console.log("Bye Bye!"));
    client.on('mensaje', (payload) => {
        console.log(payload)

        io.emit('mensaje', { notify: 'mensaje' })
    })

    client.on('flutter-test', (payload) => {
        console.log(payload)
        client.broadcast.emit('flutter-test', payload);
    })

    client.on('addVote', (bandId) => {
        console.log(`Add vote for ${bandId}`);
        bands.voteBand(bandId)
        io.emit('active-bands', bands.getBands());
    });

    client.on('addBand', (bandName) => {
        console.log(`Add band: ${bandName}`);
        bands.addBand(new Band(bandName));
        io.emit('active-bands', bands.getBands());
    });

    client.on('removeBand', (bandId) => {
        console.log(`Remove band: ${bandId}`);
        bands.removeBand(bandId);
        console.log(bands.getBands());
        io.emit('active-bands', bands.getBands());
    });
});