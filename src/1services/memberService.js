const { client } = require('../0config/database');

// Função para buscar todos os membros
async function getAllMembers() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_member;';
    const result = await client.query(query);

    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar membros:', error.stack);
    throw error;
  }
}

// Função para buscar um membro pelo ID
async function getMemberById(id) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_member WHERE tb_person_id_person = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Membro com ID ${id} não encontrado`);
    }

    console.log('Membro encontrado:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar membro com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para criar um novo membro
async function createMember(idPerson, obs) {
  try {
    const query = `
      INSERT INTO "PeDeByteSchema".tb_member (tb_person_id_person, obs) 
      VALUES ($1, $2) RETURNING *;
    `;
    const values = [idPerson, obs];
    const result = await client.query(query, values);

    console.log('Novo membro inserido:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar membro:', error.stack);
    throw error;
  }
}

// Função para atualizar um membro pelo ID
async function updateMember(idPerson, obs) {
  try {
    const query = `
      UPDATE "PeDeByteSchema".tb_member 
      SET obs = $1 
      WHERE tb_person_id_person = $2 RETURNING *;
    `;
    const values = [obs, idPerson];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Membro com ID ${idPerson} não encontrado`);
    }

    console.log('Membro atualizado:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar membro com ID ${idPerson}:`, error.stack);
    throw error;
  }
}

// Função para excluir um membro pelo ID
async function deleteMember(idPerson) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_member WHERE tb_person_id_person = $1 RETURNING *;';
    const values = [idPerson];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Membro com ID ${idPerson} não encontrado`);
    }

    console.log('Membro excluído:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir membro com ID ${idPerson}:`, error.stack);
    throw error;
  }
}

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
