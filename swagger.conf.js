const config = require(`./config/app/${process.env.NODE_ENV}`);
const swaggerHeader = {
  info: {
    title: 'OB Backend CC',
    version: '1.0.0',
    description: 'Post Service'
  },
  host: `${config.swagger.swaggerBaseUrl}/api/v1`,
  basePath: '/'
};

const options = {
  swaggerDefinition: swaggerHeader,
  apis: ['app.js', './**/routes/*.js', 'routes.js']
};

module.exports = options;
