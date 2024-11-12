// src/services/exemploService.js
const { client } = require('../0config/database');

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

async function insertData(specialityName) {
  try{
    const query = `INSERT INTO "PeDeByteSchema".tb_speciality (name) VALUES ($1) RETURNING *;`;
    const values = [specialityName];
    const res = await client.query(query, values);
    console.log('Novo registro inserido:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao fazer INSERT:', err.stack);
    throw err;
  }
}
module.exports = { getAllData, insertData };
