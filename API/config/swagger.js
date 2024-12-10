// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: ` Bed Best API's`,
            version: '1.0.0',
            description: 'API documentation for my Bed Best Node.js application',
        },
        servers: [
            {
                url: 'http://43.204.2.84:7200',
            },
            {
                url: 'http://localhost:3000',
            },
            {
                url: 'https://your-production-url.com',
            },
        ],
    },
    apis: ['./swagger/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
