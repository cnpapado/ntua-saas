# pull the official base image
FROM node:16
# set working directory - REPLACE WITH LOCAL WORKING DIRECTORY
WORKDIR \Users\ElliA\Documents\GitHub\saas2022-56\microservice01_frontend
# add `/microservice01_frontend/node_modules/.bin` to $PATH
ENV PATH /microservice01_frontend/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
# FIX ME - fix dependency conflicts and remove force flag 
RUN npm i --save react react-dom react-scripts --force

# add app
COPY . ./
# start app
CMD ["npm", "start"]