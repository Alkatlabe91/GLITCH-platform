# Use an official Node runtime as the base image
FROM node:22.9.0-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Expo CLI and @expo/ngrok globally
RUN npm install -g expo-cli @expo/ngrok

# Copy the rest of the application code
COPY . .

# Expose the ports used by Expo
EXPOSE 19000 19001 19002 8081

# Start the Expo server with tunnel option
CMD ["npm", "run", "startwithtunnel"]
