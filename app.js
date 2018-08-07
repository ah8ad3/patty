const express = require('express');
const app = express();
require('dotenv').config();
const set = require('./settings/settings');

// import all settings here
set.settings(app, express);

// import urls to project
require('./settings/urls')(app);


module.exports = app;
