FROM node:19.8.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 3000

COPY ./packages/server/package*.json /usr/src/app
COPY ./packages/server/dist /usr/src/app/dist
COPY ./packages/server/prisma /usr/src/app/prisma
COPY ./packages/client/dist /usr/src/app/dist/client/build

RUN npm install
RUN npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "start"]