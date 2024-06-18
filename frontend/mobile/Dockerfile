FROM node:13 

WORKDIR /

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start"]