FROM mongo:latest

RUN chown mongodb:mongodb /data/db


USER mongodb

VOLUME  mongodbdata /data/db

CMD ["mongod"]


EXPOSE 27017
