const mongoose = require('mongoose');
const log = require('../lib/log');

const {internal} = require('./messages');


const options = {useNewUrlParser: true };
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    options).then(() => {
    log.info(internal.database_connected);
}).catch(() => {
    log.danger(internal.database_error);
    process.exit()
});


module.exports = mongoose;
