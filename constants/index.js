const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || '3000',
  DB_DATABASE: process.env.DB_DATABASE || 'railway',
  DB_USER: process.env.DB_USER  || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '9pp0N81pFqnJIAiBiQGs',
  DB_HOST: process.env.DB_HOST  || 'containers-us-west-167.railway.app',
  DB_PORT: process.env.DB_PORT  || '7588',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey',
};
