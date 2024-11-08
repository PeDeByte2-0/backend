require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false, // Configuração importante para conexões externas
  },
});

async function connectDatabase() {
  console.log('Conectando ao PostgreSQL na AWS...' + process.env.PGUSER);
  
  try {
    await client.connect();
    console.log('Conectado ao PostgreSQL na AWS com sucesso!');
    try {
      const res = await client.query('SELECT * FROM "PeDeByteSchema".tb_speciality;'); // Altere "sua_tabela" para o nome real da sua tabela
      console.log('Resultado do SELECT *:', res.rows); // Esta linha imprime o resultado da consulta no console
      return res.rows;
    } catch (err) {
      console.error('Erro ao fazer SELECT *:', err.stack);
      throw err;
    }
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
}

module.exports = { client, connectDatabase };
