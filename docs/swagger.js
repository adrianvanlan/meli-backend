const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Docs MELI',
    description: 'API Docs for Mercado Libre Challenge',
  },
  host: `localhost:${process.env.PORT || 5000}`,
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
