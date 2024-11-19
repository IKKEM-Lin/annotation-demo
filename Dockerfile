# build frontend
FROM docker.m.daocloud.io/library/node:22.11.0-slim

WORKDIR /app
COPY . fe/
RUN cd fe && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm i

EXPOSE 3000

WORKDIR /app/fe
CMD npm run build && npm run server