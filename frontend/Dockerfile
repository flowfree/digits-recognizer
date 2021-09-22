# Build React app
# ---------------------------------------------

FROM node:16.8 AS builder

RUN mkdir /app

WORKDIR /app

COPY . /app/

RUN yarn install && yarn build 

# Serve static files with Nginx
# ---------------------------------------------

FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]

