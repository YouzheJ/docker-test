FROM node:10.11.0-alpine

COPY index.js mongodb.js package.json /home/server/

WORKDIR /home/server/

RUN npm install

CMD ["node", "index.js"]

# EXPOSE 4000
