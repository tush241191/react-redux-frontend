FROM node:18-alpine as builder

# Set the working directory to /src
WORKDIR /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the command to start the app
CMD ["npm", "run", "start"]
