FROM node:latest

WORKDIR /T-BE-T

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE $PORT

CMD ["yarn", "dev"]

# CMD npx typeorm migration:run -d dist/db/dataSourceProd.js && node dist/index.js