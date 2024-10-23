FROM node:22-alpine
WORKDIR /app
COPY package.json package.json
RUN npm install
EXPOSE 8000
COPY . .
CMD node migration.js; node App.js;