FROM node:alpine
RUN mkdir -p /app/config /app/src
WORKDIR /app
RUN mkdir -p /app/node_modules
COPY ./package.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python2 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


COPY ./ ./
RUN npm install
RUN npm install --save pg
RUN npm init -y
CMD ["npm", "start"]