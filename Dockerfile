FROM node:10.16-alpine

RUN mkdir -p /app/src

WORKDIR /app

ADD . /app
ADD package.json /app/package.json

# https://github.com/nodejs/docker-node/issues/282
RUN apk add \
        python \
        make \
        g++

RUN npm ci

CMD ["npm", "run", "start:dev"]
