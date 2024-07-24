# Usar una imagen base oficial de Node.js
FROM node:21

# Establecer el directorio de trabajo en el contenedor
WORKDIR /src

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación correrá
ENV PORT=4000

# Comando para correr la aplicación
CMD ["npm", "start"]