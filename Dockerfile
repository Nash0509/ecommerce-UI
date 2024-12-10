# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install Vite globally
RUN npm install -g vite

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the app’s code into the container
COPY . .

# Build the app for production using Vite
RUN npm run build

# Install `serve` to serve the built static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the built app
CMD ["serve", "dist"]
