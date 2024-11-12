// src/services/specialityService.js

const { client } = require('../config/database');

// Função para buscar todas as especialidades na tabela "tb_speciality"
async function fetchAllSpecialities() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_speciality;';
    const result = await client.query(query);
    
    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error.stack);
    throw error;
  }
}

// Função para criar uma nova especialidade na tabela "tb_speciality"
async function createSpeciality(specialityName) {
  try {
    const query = `INSERT INTO "PeDeByteSchema".tb_speciality (name) VALUES ($1) RETURNING *;`;
    const values = [specialityName];
    const result = await client.query(query, values);
    
    console.log('Nova especialidade inserida:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar especialidade:', error.stack);
    throw error;
  }
}

module.exports = {
  fetchAllSpecialities,
  createSpeciality,
};
