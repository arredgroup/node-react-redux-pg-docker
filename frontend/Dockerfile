FROM node:alpine
WORKDIR /app/
RUN mkdir -p /app/node_modules
COPY ./package.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python2 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY ./ ./

EXPOSE 3000
CMD ["npm", "start"]