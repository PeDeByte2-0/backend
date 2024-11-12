// src/controllers/exemploController.js
const { getAllSpecialities, getSpecialityById, createSpeciality } = require('../1services/specialityService');

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
module.exports = { getData, getDataById, setData };
