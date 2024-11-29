const { client } = require('../0config/database');

// Função para buscar dados pessoais pelo ID de tb_person
async function getPersonDataByPersonId(personId) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_person_data WHERE tb_person_data.person_id = $1;;';
    const values = [personId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Dados pessoais para o ID ${personId} não encontrados`);
    }

    console.log('Dados pessoais encontrados:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar dados pessoais para o ID ${personId}:`, error.stack);
    throw error;
  }
}

// Função para criar dados pessoais para uma pessoa
async function createPersonDataProfessional(personId, firstName, lastName, cpf, celular) {
  try {

    await client.query('BEGIN;');

    const query = `
      INSERT INTO "PeDeByteSchema".tb_person_data 
      (person_id, first_name, last_name, cpf, celular) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [personId, firstName, lastName, cpf, celular];
    const result = await client.query(query, values);

    await client.query('COMMIT;');

    console.log('Dados pessoais inseridos:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK;');
    console.error('Erro ao criar dados pessoais:', error.stack);
    throw error;

  }

}

async function createPersonDataStudent(personId, firstName, lastName, cpf, celular, celular2, responsavel) {

  try {

    await client.query('BEGIN;');

    const query = `
      INSERT INTO "PeDeByteSchema".tb_person_data 
      (person_id, first_name, last_name, cpf, celular, celular_2, responsavel) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [personId, firstName, lastName, cpf, celular, celular2, responsavel];
    const result = await client.query(query, values);

    await client.query('COMMIT;');

    console.log('Dados pessoais inseridos:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK;');
    console.error('Erro ao criar dados pessoais:', error.stack);
    throw error;

  }

}


// Função para atualizar dados pessoais pelo ID de tb_person
async function updatePersonDataProfessional(personId, firstName, lastName, cpf, celular) {

  try {

    await client.query('BEGIN;');

    const query = `
      UPDATE "PeDeByteSchema".tb_person_data 
      SET first_name = $1, last_name = $2, cpf = $3, celular = $4 
      WHERE tb_person_data.person_id = $5 RETURNING *;
    `;
    const values = [firstName, lastName, cpf, celular, personId];
    const result = await client.query(query, values);
    
    await client.query('COMMIT;');

    if (result.rows.length === 0) {
      throw new Error(`Dados pessoais para o ID ${personId} não encontrados`);
    }

    console.log('Dados pessoais atualizados:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK;');
    console.error(`Erro ao atualizar dados pessoais para o ID ${personId}:`, error.stack);
    throw error;

  }

}

async function updatePersonDataStudent(personId, firstName, lastName, cpf, celular, celular2, responsavel) {

  try {

    await client.query('BEGIN;');
    const query = `
      UPDATE "PeDeByteSchema".tb_person_data 
      SET first_name = $1, last_name = $2, cpf = $3, celular = $4, celular_2 = $5, responsavel = $6 
      WHERE tb_person_data.person_id = $7 RETURNING *;
    `;
    const values = [firstName, lastName, cpf, celular, celular2, responsavel, personId];
    const result = await client.query(query, values);

    await client.query('COMMIT;');

    if (result.rows.length === 0) {
      throw new Error(`Dados pessoais para o ID ${personId} não encontrados`);
    }

    console.log('Dados pessoais atualizados:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK;');
    console.error(`Erro ao atualizar dados pessoais para o ID ${personId}:`, error.stack);
    throw error;

  }

}

// Função para excluir dados pessoais pelo ID de tb_person
async function deletePersonDataByPersonId(personId) {

  try {

    await client.query('BEGIN;');

    const query = 'DELETE FROM "PeDeByteSchema".tb_person_data where tb_person_data.person_id = $1 RETURNING *;';
    const values = [personId];
    const result = await client.query(query, values);

    await client.query('COMMIT;');

    if (result.rows.length === 0) {
      throw new Error(`Dados pessoais para o ID ${personId} não encontrados`);
    }

    console.log('Dados pessoais excluídos:', result.rows[0]);
    return result.rows[0];

  } catch (error) {

    await client.query('ROLLBACK;');
    console.error(`Erro ao excluir dados pessoais para o ID ${personId}:`, error.stack);
    throw error;

  }
  
}

module.exports = {
  getPersonDataByPersonId,
  createPersonDataProfessional,
  updatePersonDataProfessional,
  deletePersonDataByPersonId,
  createPersonDataStudent,
  updatePersonDataStudent,
};
