const { client } = require('../0config/database');

// Função para buscar todas as horas
async function getAllHours() {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_hours;';
    const result = await client.query(query);
    
    console.log('Resultado do SELECT *:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar horas:', error.stack);
    throw error;
  }
}

// Função para buscar uma hora pelo ID
async function getHourById(id) {
  try {
    const query = 'SELECT * FROM "PeDeByteSchema".tb_hours WHERE id_hours = $1;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Hora com ID ${id} não encontrada`);
    }

    console.log('Hora encontrada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar hora com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para criar uma nova hora
async function createHour(weekday, starttime, endtime) {
  try {
    const query = `INSERT INTO "PeDeByteSchema".tb_hours (weekday, starttime, endtime) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [weekday, starttime, endtime];
    const result = await client.query(query, values);
    
    console.log('Nova hora inserida:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar hora:', error.stack);
    throw error;
  }
}

// Função para atualizar uma hora pelo ID
async function updateHour(id, weekday, starttime, endtime) {
  try {
    const query = `UPDATE "PeDeByteSchema".tb_hours SET weekday = $1, starttime = $2, endtime = $3 WHERE id_hours = $4 RETURNING *;`;
    const values = [weekday, starttime, endtime, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Hora com ID ${id} não encontrada`);
    }

    console.log('Hora atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar hora com ID ${id}:`, error.stack);
    throw error;
  }
}

// Função para excluir uma hora pelo ID
async function deleteHour(id) {
  try {
    const query = 'DELETE FROM "PeDeByteSchema".tb_hours WHERE id_hours = $1 RETURNING *;';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Hora com ID ${id} não encontrada`);
    }

    console.log('Hora excluída:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao excluir hora com ID ${id}:`, error.stack);
    throw error;
  }
}

module.exports = {
  getAllHours,
  getHourById,
  createHour,
  updateHour,
  deleteHour,
};
