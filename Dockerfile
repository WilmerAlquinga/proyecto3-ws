# Define base image
FROM node:14

# Copy all files of aplication to the container
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set NODE_ENV to prod
ENV NODE_ENV=prod

# Copy file .env.prod
COPY .env.prod .env

# Expose app on port 3000
EXPOSE 3000

# Define comand to start app
CMD ["npm", "start"]
