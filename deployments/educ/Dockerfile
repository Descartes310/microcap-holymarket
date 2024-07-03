FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
COPY .env.example.educ ./.env
RUN rm -rf node_modules
RUN yarn config set registry https://registry.npmjs.org
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx
COPY deployments/educ/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]