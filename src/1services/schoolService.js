// src/services/exemploService.js

const { client } = require('../0config/database');

// Função para buscar todas as especialidades
async function getAllSchools() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_school;';
    const result = await client.query(query);
    
    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error.stack);
    throw error;
  }
}

// Função para buscar uma especialidade pelo ID
async function getSchoolById(id) {
  try {
    console.log("mamada" + id);
    
    const query = 'SELECT * FROM "PeDeByteSchema".tb_school WHERE id_school = $1;';
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
// Função para criar uma nova escola
async function createSchool(schoolName, weekProfileId) {
  try {
    const query = `INSERT INTO "PeDeByteSchema".tb_school (name, id_week_profile) VALUES ($1, $2) RETURNING *;`;
    const values = [schoolName, weekProfileId];
    const result = await client.query(query, values);

    console.log('Nova escola inserida:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar escola:', error.stack);
    throw error;
  }
}

// Função para atualizar uma escola pelo ID
async function updateSchool(id, schoolName, weekProfileId) {
  try {
    const query = `UPDATE "PeDeByteSchema".tb_school SET name = $1, id_week_profile = $2 WHERE id_school = $3 RETURNING *;`;
    const values = [schoolName, weekProfileId, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Escola com ID ${id} não encontrada`);
    }

    console.log('Escola atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar escola com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para excluir uma especialidade pelo ID
async function deleteSchool(id) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_school WHERE id_school = $1 RETURNING *;';
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
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
};
