FROM nginx:1.15.2-alpine

COPY ./client/* /usr/local/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
