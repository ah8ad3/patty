# potty
[![Build Status](https://travis-ci.org/istanbuljs/nyc.svg?branch=master)](https://travis-ci.org/istanbuljs/nyc)


lightweight express js tool 
for easy authentication and api usage in mvc
this is not a new framework this is just express js and we just make it easy to use

- authentication with session passport
- authentication with jwt token
- models with mongoose mongodb 
- email smtp with node mailer
- jade html template renderer
- translation with i18n in standard mode
- cli added potty.js
- google oauth support
- define dev or production mode easy in env file
for production mode you can use [strong pm](http://strong-pm.io/) that restart youre app when crashed
also we create an simple `production.bash` use [cross-env](https://www.npmjs.com/package/cross-env)
library for run perfectly on windows and linux on production mode
you can add more flags as you need
- redis support for session or cache
- test added but some docs needed, for coverage test just use [nyc](https://www.npmjs.com/package/nyc)
with this command `nyc npm test` 


# Todo:
- make contribution table
- create an library called potty and add all features to it
- add sql ability for db
- add django like admin page
- add queue 
- add graphql ability for request and db
- merge some small dependency to main library
- add docker-compose
- planning for use some automatic tools for bundle
- ...


# usage:
clone project copy env file to .env file and put values 
run `npm install`
then run `npm start` and server run in `http://localhost:5000`

this project run with node version 10.8.0
and npm version 6.3.0 without any problem

This repo is free to use with only cite 
