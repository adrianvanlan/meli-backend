FROM node:21-alpine

ENV NODE_ENV=production
ENV PORT=5000

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY src/ src/
COPY docs/ docs/

EXPOSE 5000

RUN npm run swagger
CMD [ "npm", "start"]
