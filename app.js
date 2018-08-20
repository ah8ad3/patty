const express = require('express');
const app = express();
require('dotenv').config();
const set = require('./settings/settings');


const http = require('http');
const log = require('./lib/log');
const server = http.createServer(app);

let io = undefined;
if (process.env.SOCKET_USE === '1'){
    io = require('socket.io')(server);
    log.info('using socket io')
}


// import all settings here
set.settings(app, express);

// import urls to project
require('./settings/urls')(app, io);


module.exports = {
    app: app,
    server: server
};
