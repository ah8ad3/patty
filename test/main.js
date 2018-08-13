//During the test the env variable is set to test
process.env.PD_FLAG = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.should();

chai.use(chaiHttp);

/*
*  Just import apps test here like above
* */


// test for user app
require('../app/user/test')(chai, server);
