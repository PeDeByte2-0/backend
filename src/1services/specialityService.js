// src/services/exemploService.js

const { client } = require('../0config/database');

// Função para buscar todas as especialidades
async function getAllSpecialities() {
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

// Função para buscar uma especialidade pelo ID
async function getSpecialityById(id) {
  try {
    console.log("mamada" + id);
    
    const query = 'SELECT * FROM "PeDeByteSchema".tb_speciality WHERE id_speciality = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Especialidade com ID ${id} não encontrada`);
    }

    console.log('Especialidade encontrada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar especialidade com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para criar uma nova especialidade
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

// Função para atualizar uma especialidade pelo ID
async function updateSpeciality(id, specialityName) {
  try {
    const query = `UPDATE "PeDeByteSchema".tb_speciality SET name = $1 WHERE id_speciality = $2 RETURNING *;`;
    const values = [specialityName, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Especialidade com ID ${id} não encontrada`);
    }

    console.log('Especialidade atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar especialidade com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para excluir uma especialidade pelo ID
async function deleteSpeciality(id) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_speciality WHERE id_speciality = $1 RETURNING *;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Especialidade com ID ${id} não encontrada`);
    }

    console.log('Especialidade excluída:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir especialidade com ID ${id}:`, error.stack);
    throw error;
  }
}

module.exports = {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
};
