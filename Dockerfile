FROM docker.hzc.pub/library/node:22.11.0-slim

WORKDIR /app
COPY . fe/
RUN cd fe && \
    npm config set registry https://registry.npmmirror.com/

EXPOSE 3000

WORKDIR /app/fe
CMD npm run server