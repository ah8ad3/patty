# patty
[![Build Status](https://travis-ci.org/ah8ad3/patty.svg?branch=master)](https://travis-ci.org/ah8ad3/patty)
[![Coverage Status](https://coveralls.io/repos/github/ah8ad3/potty/badge.svg)](https://coveralls.io/github/ah8ad3/potty)

lightweight express js tool 
for easy authentication and api usage in mvc
this is not a new framework this is just express js and we just make it easy to use

- authentication with session passport
- authentication with jwt token
- models with mongoose mongodb 
- email smtp with node mailer
- jade html template renderer
- translation with i18n in standard mode
- cli patty.js
- google oauth support
- define dev or production mode easy in env file
for production mode you can use [strong pm](http://strong-pm.io/) that restart youre app when crashed
also we create an simple `production.bash` use [cross-env](https://www.npmjs.com/package/cross-env)
library for run perfectly on windows and linux on production mode
you can add more flags as you need
- redis support for session or cache
- test added but some docs needed, for coverage test just use [nyc](https://www.npmjs.com/package/nyc)
with this command `nyc npm test` 
- docker-compose for production mode
- sentry for error handling, only in global mode you can write youre custom exception handler
- super easy way to enable and use socket io in project
- cors header support for all or some routes or custom origin
- using private and public media files


# Todo:
- redis cache
- planning to add free and secure ssl (maybe in external project or here)
- add queue (there is many queue library like kue, queue,... you can use by yore need)
- permission system (i done this before but i think not need for this repo and i decide to make this repo easy for all)
- add sql ability for db(this implement in external repo as need)
- add graphql ability for request and db (this implement in external repo as need)
- if you have any offer for improve this repo i glad to hear it with me gmail
- i implement some simple project with this repo and add later 


# usage:
clone project copy env file to .env file and put values
don't forget to put secret key
 
run `npm install`
then run `npm start` and server run in `http://localhost:5000`

this project run with node version 10.8.0
and npm version 6.3.0 without any problem

This repo is free to use with only cite 
