// src/controllers/exemploController.js
const { getAllSchools, getSchoolById, createSchool } = require('../1services/schoolService');

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
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const newSchool = await createSchool(name);
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller' + err);
  }
}
module.exports = { getData, getDataById, setData };
