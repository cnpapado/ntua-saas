# pull the official base image
FROM node:16
# set working directory - REPLACE WITH LOCAL WORKING DIRECTORY
WORKDIR \Users\ElliA\Documents\GitHub\saas2022-56\microservice06-intermediate
# add `/microservice06-intermediate/node_modules/.bin` to $PATH
ENV PATH /microservice06-intermediate/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm i 

# add app
COPY . ./
# start app
CMD ["node", "server.js"]