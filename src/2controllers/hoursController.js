// src/controllers/hoursController.js
const { getAllHours, getHourById, createHour, updateHour, deleteHour } = require('../1services/hoursService');

function hoursConverter(hours) {
  return hours.map(e => ({
    ...e, // Copia as propriedades originais
    weekday: e.weekday === "0" ? 'Segunda-feira' :
             e.weekday === "1" ? 'Terça-feira' :
             e.weekday === '2' ? 'Quarta-feira' :
             e.weekday === '3' ? 'Quinta-feira' :
             e.weekday === '4' ? 'Sexta-feira' :
             e.weekday === "5" ? 'Sábado' :
             'Domingo'
  }));
}
async function getHours(req, res) {
  try {
    console.log("getHours");
    
    const data = await getAllHours();
    const newData = hoursConverter(data);
    res.json(newData);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados de horas no controller');
  }
}

async function getById(req, res) {
  try {
    console.log("getHourById");
    const hourId = req.params.id;
    const data = await getHourById(hourId);
    const newData = hoursConverter(data);
    res.json(newData);
  } catch (err) {
    res.status(500).send('Erro ao buscar hora pelo ID no controller');
  }
}
async function createData(req, res) {
  try {
    const { weekday, starttime, endtime } = req.body;

    if (weekday === undefined || !starttime || !endtime) {
      return res.status(400).json({ message: 'Os campos "weekday", "starttime" e "endtime" são obrigatórios.' });
    }

    const newHour = await createHour(weekday, starttime, endtime);
    res.status(201).json(newHour);
  } catch (err) {
    res.status(500).send('Erro ao criar nova hora no controller: ' + err);
  }
}

async function updateData(req, res) {
  try {
    const { weekday, starttime, endtime } = req.body;
    const hourId = req.params.id;

    if (weekday === undefined || !starttime || !endtime) {
      return res.status(400).json({ message: 'Os campos "weekday", "starttime" e "endtime" são obrigatórios.' });
    }

    const updatedHour = await updateHour(hourId, weekday, starttime, endtime);

    if (updatedHour) {
      return res.status(200).json(updatedHour); // Atualização bem-sucedida
    } else {
      return res.status(404).json({ message: 'Hora não encontrada.' }); // Caso o ID não exista
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar hora.', error: err.message });
  }
}

async function deleteData(req, res) {
  try {
    const hourId = req.params.id;
    const data = await deleteHour(hourId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao excluir hora no controller');
  }
}

module.exports = { getHours, getById, createData, updateData, deleteData };
