const { client } = require('../0config/database');

// Função para buscar todas as pessoas
async function getAllPersons() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_person;';
    const result = await client.query(query);

    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error.stack);
    throw error;
  }
}

// Função para buscar uma pessoa pelo ID
async function getPersonById(id) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_person WHERE id_person = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa encontrada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar pessoa com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para criar uma nova pessoa
async function createPerson(tb_school_id_school) {
  try {
    const query = `
      INSERT INTO "PeDeByteSchema".tb_person (active, tb_school_id_school) 
      VALUES ($1, $2) RETURNING *;
    `;
    const values = ['TRUE', tb_school_id_school];
    const result = await client.query(query, values);

    console.log('Nova pessoa inserida:', result.rows[0]);
    return result.rows[0].id_person;
  } catch (error) {
    console.error('Erro ao criar pessoa:', error.stack);
    throw error;
  }
}

// Função para atualizar uma pessoa pelo ID
async function updatePerson(id, active, tb_school_id_school) {
  try {
    const query = `
      UPDATE "PeDeByteSchema".tb_person 
      SET active = $1, tb_school_id_school = $2 
      WHERE id_person = $3 RETURNING *;
    `;
    const values = [active, tb_school_id_school, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar pessoa com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para excluir uma pessoa pelo ID
async function deletePerson(id) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_person WHERE id_person = $1 RETURNING *;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa excluída:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir pessoa com ID ${id}:`, error.stack);
    throw error;
  }
}

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
