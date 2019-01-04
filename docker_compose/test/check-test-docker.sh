docker-compose stop
docker-compose down
docker-compose build
docker-compose up -d

sleep 5

node=$(docker-compose ps -q node)

check=$(docker inspect --format='{{json .State.ExitCode}}' $node)

if [ $check -eq 0 ]
then
 echo 'correctly'
 docker-compose stop
  exit 0
else
 echo 'tests failed'
 docker-compose stop
 exit 1
fi
