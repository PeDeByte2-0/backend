const { client } = require('../0config/database');

// Função para buscar todos os perfis semanais
async function getAllWeekProfiles() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_week_profile;';
    const result = await client.query(query);
    
    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar perfis semanais:', error.stack);
    throw error;
  }
}

// Função para buscar um perfil semanal pelo ID
async function getWeekProfileById(id) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_week_profile WHERE id_week_profile = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Perfil semanal com ID ${id} não encontrado`);
    }

    console.log('Perfil semanal encontrado:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar perfil semanal com ID ${id}:`, error.stack);
    throw error;
  }
}
// Função para criar um novo perfil semanal com o campo 'name'
async function createWeekProfile(name) {
  try {
    const query = `
      INSERT INTO "PeDeByteSchema".tb_week_profile (name) 
      VALUES ($1) 
      RETURNING *;
    `;
    const values = [name];
    const result = await client.query(query, values);

    console.log('Novo perfil semanal inserido:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar perfil semanal:', error.stack);
    throw error;
  }
}

// Função para atualizar o campo 'name' de um perfil semanal pelo ID
async function updateWeekProfile(id, name) {
  try {
    const query = `
      UPDATE "PeDeByteSchema".tb_week_profile 
      SET name = $1 
      WHERE id_week_profile = $2 
      RETURNING *;
    `;
    const values = [name, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Perfil semanal com ID ${id} não encontrado`);
    }

    console.log('Perfil semanal atualizado:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar perfil semanal com ID ${id}:`, error.stack);
    throw error;
  }
}


// Função para excluir um perfil semanal pelo ID
async function deleteWeekProfile(id) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_week_profile WHERE id_week_profile = $1 RETURNING *;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Perfil semanal com ID ${id} não encontrado`);
    }

    console.log('Perfil semanal excluído:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir perfil semanal com ID ${id}:`, error.stack);
    throw error;
  }
}

module.exports = {
  getAllWeekProfiles,
  getWeekProfileById,
  createWeekProfile,
  updateWeekProfile,
  deleteWeekProfile,
};
