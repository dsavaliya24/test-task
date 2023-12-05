# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Create a build of the application
RUN npm run build

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]
