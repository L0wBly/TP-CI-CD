FROM node:alpine

WORKDIR /app/

COPY package*.json .

RUN npm install

COPY . /app/

EXPOSE 9652

CMD ["npm", "start"]