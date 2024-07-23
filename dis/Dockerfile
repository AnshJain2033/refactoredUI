### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
#FROM node:18-alpine as builder

#ENV NODE_VERSION=18.12.1
# Create a Virtual directory inside the docker image

#WORKDIR /dis-ui-app
# Copy files to virtual directory

#COPY package.json package-lock.json ./
# Run command in Virtual directory
#RUN npm cache clean --force

#RUN npm install
# Copy files from local machine to virtual directory in docker image

#COPY .. .

#RUN npm run build --prod


### STAGE 2:RUN ###
# use the latest version of the official nginx image as the base image
FROM nginx:latest
# copy the custom nginx configuration file to the container in the
# default location
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy the built Angular app files to the default nginx html directory
COPY /dist/dis /usr/share/nginx/html
#COPY --from=builder /dis-ui-app/dist/dis/* /usr/share/nginx/html/

# the paths are relative from the Docker file