FROM node:12.13.1 AS development

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json

RUN yarn install

CMD ["npm", "run", "start:dev"]
