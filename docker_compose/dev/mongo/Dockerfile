FROM mongo:4

RUN chown mongodb:mongodb /data/db


USER mongodb

VOLUME  mongoData /data/db

CMD ["mongod"]


EXPOSE 27017
