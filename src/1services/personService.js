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
async function createPerson(idSchool) {
  
  try {

    await client.query('BEGIN');

    const query = `
      INSERT INTO "PeDeByteSchema".tb_person (active, school_id) 
      VALUES (TRUE, $1) RETURNING *;
    `;

    const values = [idSchool];
    const result = await client.query(query, values);

    console.log('Nova pessoa inserida:', result.rows[0]);

    await client.query('COMMIT');
    return result.rows[0].id_person;

  } catch (error) {

    await client.query('ROLLBACK');
    console.error('Erro ao criar pessoa:', error.stack);
    throw error;

  }

}

// Função para atualizar uma pessoa pelo ID
async function updatePerson(id, idSchool) {

  try {

    await client.query('BEGIN');

    const query = `
      UPDATE "PeDeByteSchema".tb_person 
      SET school_id = $1 
      WHERE id_person = $2 RETURNING *;
    `;
    const result = await client.query(query, [idSchool, id]);

    await client.query('COMMIT');

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa atualizada:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK')
    console.error(`Erro ao atualizar pessoa com ID ${id}:`, error.stack);
    throw error;
    
  }

}

async function inativatePerson(id) {

  try {

    await client.query('BEGIN');
    const query = `
      UPDATE "PeDeByteSchema".tb_person 
      SET active = FALSE 
      WHERE id_person = $1 RETURNING *;
    `;
    const result = await client.query(query, [id]);
    await client.query('COMMIT');

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa atualizada:', result.rows[0]);

    return result.rows[0].id_person;

  } catch (error) {

    await client.query('ROLLBACK');
    console.error(`Erro ao atualizar pessoa com ID ${id}:`, error.stack);
    throw error;

  }

}

// Função para excluir uma pessoa pelo ID
async function deletePerson(id) {

  try {

    await client.query('BEGIN');

    const query = 'DELETE FROM "PeDeByteSchema".tb_person WHERE id_person = $1 RETURNING *;';
    const values = [id];
    const result = await client.query(query, values);

    await client.query('COMMIT');

    if (result.rows.length === 0) {
      throw new Error(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('Pessoa excluída:', result.rows[0]);
    return result.rows[0];

  } catch (error) {
    await client.query('ROLLBACK');
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
  inativatePerson
};
