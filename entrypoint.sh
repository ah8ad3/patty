#!/bin/bash
#npm install
npm test
if [ $? -eq 0 ]
then
  cd docker_compose/dev/ && docker-compose up
else
  echo 'cant run docker compose because test fail'
fi
