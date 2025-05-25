import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    servers: [{ url: '/api' }],
    info: {
      title: `Assignment API's`,
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./src/routes/*.ts', './src/modules/**/*.ts'],
};

export const swaggerConfig = swaggerJsdoc(options);
