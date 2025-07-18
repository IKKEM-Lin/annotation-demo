# Development
Please create ```./data``` folder firstly and run:
```
npm i
npm run dev
node server.mjs # Run on another terminal
```

# Deploy
Please create ```./data``` folder firstly and run:
```
docker build -t annotation-app .
docker run --rm -it --user root  --mount type=bind,source=~/,target=/mnt  annotation-app sh  # Optional, install dependencies in container 
docker compose up -d
```
