FROM node:10.8-alpine

# Create app directory
WORKDIR /usr/src/app


# Bundle app source
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production


CMD [ "npm", "start" ]
