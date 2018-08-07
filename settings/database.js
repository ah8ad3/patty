const mongoose = require('mongoose');
const log = require('../lib/log');


const options = {useNewUrlParser: true };
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    options).then(() => {
    log.info('database connected');
}).catch(() => {
    log.danger('database cant connect');
    process.exit()
});


module.exports = mongoose;
