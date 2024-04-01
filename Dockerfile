FROM node:14-alpine AS build

WORKDIR /app
COPY . ./
COPY package.json ./
COPY .env.example.test ./.env
RUN rm -rf node_modules
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]