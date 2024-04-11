#first step
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


#genero la carpeta dist con archivos complados
RUN npm run build
#second step
FROM nginx:alpine
#copia la carpeta compilada en el archivo de configuracion nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]