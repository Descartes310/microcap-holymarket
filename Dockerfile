FROM node:14 AS build
WORKDIR /app
COPY package.json ./
COPY .env.example.test ./.env
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]