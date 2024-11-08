// src/services/exemploService.js
const { client } = require('../config/database');

async function getAllData() {
  try {
    const res = await client.query('SELECT * FROM "PeDeByteSchema".tb_speciality;'); // Altere "sua_tabela" para o nome real da sua tabela
    console.log('Resultado do SELECT *:', res.rows); // Esta linha imprime o resultado da consulta no console
    return res.rows;
  } catch (err) {
    console.error('Erro ao fazer SELECT *:', err.stack);
    throw err;
  }
}

module.exports = { getAllData };
