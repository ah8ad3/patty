#!/bin/bash
#npm install
npm test
if [ $? -eq 0 ]
then
  npm start
else
  echo 'cant run docker compose because test fail'
fi
