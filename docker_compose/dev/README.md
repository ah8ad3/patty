## Note
> for run in safe mode

run ir once at start
```bash
docker volume create mongodbdata

```

then for run 
```bash
docker-compose build 
docker-compose up -d
 
curl localhost:5000
```

youre server run at `localhost:5000`