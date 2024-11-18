// src/controllers/exemploController.js
const { getAllSpecialities, getSpecialityById, createSpeciality, updateSpeciality, deleteSpeciality} = require('../1services/specialityService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllSpecialities();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const specialityId = req.params.id;
    const data = await getSpecialityById(specialityId);
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

    const newSpeciality = await createSpeciality(name);
    res.status(201).json(newSpeciality);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller' + err);
  }
}
async function updateData(req, res) {
  try {
    const { name } = req.body;
    const specialityId = req.params.id;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newSpeciality = await updateSpeciality(specialityId, name);

    if (newSpeciality) {
      return res.status(200).json(newSpeciality); // Atualização bem-sucedida
    } else {
      return res.status(404).json({ message: 'Especialidade não encontrada.' }); // Caso o ID não exista
    }

  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade.', error: err.message });
  }
}

async function deleteData(req, res) {
  try {
    const specialityId = req.params.id;
    const data = await deleteSpeciality(specialityId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
