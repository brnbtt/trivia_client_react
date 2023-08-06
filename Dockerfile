# Use Node.js 20.5.0 as the base image
FROM node:20.5.0

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Build the React app
RUN npm run build

# Use serve to serve the production build of the React app
RUN npm install -g serve

# Set the command to run your app using serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 8000 for the app
EXPOSE 3000
