FROM node:12.10.0-alpine

RUN mkdir /swvl_notification
WORKDIR /swvl_notification

COPY ./package.json /swvl_notification/package.json
COPY ./package-lock.json /swvl_notification/package-lock.json

RUN npm install -g ts-node
RUN npm install

COPY . /swvl_notification

EXPOSE 3000

CMD ["ts-node", "app.ts"]
