require('dotenv').config();

module.exports = {
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    databaseUrl: process.env.DATABASE_URL
  },
  baseUrl: {
    postService: 'https://jsonplaceholder.typicode.com'
  },
  swagger: {
    baseUrl: 'localhost:3000'
  }
};
