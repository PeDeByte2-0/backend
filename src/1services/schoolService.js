const { client } = require('../0config/database');

// Função para buscar todas as escolas
async function getAllSchools() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_school;';
    const result = await client.query(query);
    
    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar escolas:', error.stack);
    throw error;
  }
}

// Função para buscar uma escola pelo ID
async function getSchoolById(id) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_school WHERE id_school = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Escola com ID ${id} não encontrada`);
    }

    console.log('Escola encontrada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar escola com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para criar uma nova escola
async function createSchool(tb_week_profile_id_week_profile) {
  try {
    const query = `INSERT INTO "PeDeByteSchema".tb_school (tb_week_profile_id_week_profile) VALUES ($1) RETURNING *;`;
    const values = [tb_week_profile_id_week_profile];
    const result = await client.query(query, values);
    
    console.log('Nova escola inserida:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar escola:', error.stack);
    throw error;
  }
}

// Função para atualizar uma escola pelo ID
async function updateSchool(id_school, tb_week_profile_id_week_profile) {
  try {
    const query = `UPDATE "PeDeByteSchema".tb_school SET tb_week_profile_id_week_profile = $1 WHERE id_school = $2 RETURNING *;`;
    const values = [tb_week_profile_id_week_profile, id_school];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Escola com ID ${id_school} não encontrada`);
    }

    console.log('Escola atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar escola com ID ${id_school}:`, error.stack);
    throw error;
  }
}

// Função para excluir uma escola pelo ID
async function deleteSchool(id_school) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_school WHERE id_school = $1 RETURNING *;';
    const values = [id_school];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Escola com ID ${id_school} não encontrada`);
    }

    console.log('Escola excluída:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir escola com ID ${id_school}:`, error.stack);
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
