# Define la imagen base
FROM node:14

# Copia los archivos de la aplicación al contenedor
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Establece la variable de entorno NODE_ENV a prod
ENV NODE_ENV=prod

# Copia el archivo .env.prod
COPY .env.prod .env

# Expone el puerto 3000
EXPOSE 3000

# Define el comando de inicio
CMD ["npm", "start"]
