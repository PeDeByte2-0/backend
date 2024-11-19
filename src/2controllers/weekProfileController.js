// src/controllers/exemploController.js
const { getAllWeekProfiles, getWeekProfileById, createWeekProfile, updateWeekProfile, deleteWeekProfile} = require('../1services/weekProfileService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllWeekProfiles();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const weekProfileId = req.params.id;
    const data = await getWeekProfileById(weekProfileId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

async function setData(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newWeekProfile = await createWeekProfile(name);
    res.status(201).json(newWeekProfile);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller' + err);
  }
}
async function updateData(req, res) {
  try {
    const { name } = req.body;
    const weekProfileId = req.params.id;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newWeekProfile = await updateWeekProfile(weekProfileId, name);

    if (newWeekProfile) {
      return res.status(200).json(newWeekProfile); // Atualização bem-sucedida
    } else {
      return res.status(404).json({ message: 'Especialidade não encontrada.' }); // Caso o ID não exista
    }

  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade.', error: err.message });
  }
}

async function deleteData(req, res) {
  try {
    const weekProfileId = req.params.id;
    const data = await deleteWeekProfile(weekProfileId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
