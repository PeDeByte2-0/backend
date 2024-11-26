// src/controllers/exemploController.js
const { getAllSchools, getSchoolById, createSchool, updateSchool, deleteSchool} = require('../1services/schoolService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllSchools();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const schoolId = req.params.id;
    const data = await getSchoolById(schoolId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

async function setData(req, res) {
  try {
    const { name, weekId } = req.body;

    if (!name || !weekId) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newSchool = await createSchool(name, weekId);
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller' + err);
  }
}
async function updateData(req, res) {
  try {
    const { name, weekId } = req.body;
    const schoolId = req.params.id;

    if (!name || !weekId) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newSchool = await updateSchool(schoolId, name);

    if (newSchool) {
      return res.status(200).json(newSchool); // Atualização bem-sucedida
    } else {
      return res.status(404).json({ message: 'Especialidade não encontrada.' }); // Caso o ID não exista
    }

  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar especialidade.', error: err.message });
  }
}

async function deleteData(req, res) {
  try {
    const schoolId = req.params.id;
    const data = await deleteSchool(schoolId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
