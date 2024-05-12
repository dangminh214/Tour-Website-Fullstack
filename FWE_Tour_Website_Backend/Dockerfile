# Use the official Node.js image as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port where the application will run
EXPOSE 8000

# Start the Node.js application
CMD ["npm", "start"]