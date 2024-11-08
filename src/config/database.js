// src/config/database.js
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao PostgreSQL com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
}

module.exports = { client, connectDatabase };
