const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

console.log('DB_HOST raw:', JSON.stringify(process.env.DB_HOST));
console.log('DB_PORT raw:', JSON.stringify(process.env.DB_PORT));
console.log('DB_NAME raw:', JSON.stringify(process.env.DB_NAME));
console.log('DB_USER raw:', JSON.stringify(process.env.DB_USER));

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // enklest løsning for nå
      }
    }
  }
);

module.exports = sequelize;