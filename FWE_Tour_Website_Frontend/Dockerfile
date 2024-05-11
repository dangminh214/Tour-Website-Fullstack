# Use the official Node.js image as base
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
# RUN npm run build

ENV PORT=8000
# Expose port 8000
EXPOSE 8000

# Start nginx
CMD ["npm", "start"]

