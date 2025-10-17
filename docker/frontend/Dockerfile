FROM node:22.12-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:1.25-alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/aid-locator-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]