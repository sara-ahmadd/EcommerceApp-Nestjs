FROM node:22.14.0 as base
WORKDIR /app
COPY package.json .

FROM base as dev
RUN npm i
COPY . .

# Install nodemon globally for live reload
RUN npm install -g nodemon 

CMD [ "npm","run","start:dev" ]

FROM base as prod
RUN npm i --only=production
COPY . .
# Build the NestJS app
RUN npm run build
CMD [ "npm","run","start:prod" ]