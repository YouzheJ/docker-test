FROM nginx:1.15.2-alpine

COPY index.html index.css /usr/local/nginx/html/
COPY hello-world.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]

#EXPOSE 3000
