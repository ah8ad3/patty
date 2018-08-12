const redis = require('redis');
const client = redis.createClient({host:process.env.REDIS_SES_HOST, port:parseInt(process.env.REDIS_SES_PORT)});

const {internal} = require('./messages');
const log = require('../lib/log');

let test_value = 'test value';
let error = () => {
      log.danger(internal.redis_error);
      process.exit();
};

client.on('error', function(){
    error();
});

client.set('my test key', test_value);
client.get('my test key', function(error, result) {
    if (error) {
        error();
    }
    if (test_value !== result) {
        error();
    }
});


module.exports = client;
