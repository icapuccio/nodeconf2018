FROM node:10.12-alpine

ENV SERVICE_NAME nodeconf

WORKDIR /var/app/$SERVICE_NAME/

ADD package.json /var/app/$SERVICE_NAME/
ADD package-lock.json /var/app/$SERVICE_NAME/

# Build dependencies
RUN npm ci

ADD . /var/app/$SERVICE_NAME

CMD npm start
