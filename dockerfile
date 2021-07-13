FROM node:14-slim

RUN npm install -g lerna

# Create app directory
WORKDIR /app

# Copy app source code
COPY . .

# Install app dependencies
RUN npm ci
RUN npm run bootstrap
RUN npm run build
RUN mkdir logs

#Expose port and start application
EXPOSE 3001
# CMD [ "node", "./dist/core/main.js" ]
CMD [ "npm", "start" ]