// src/controllers/exemploController.js
const { getAllSpecialities } = require('../1services/specialityService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllSpecialities();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

module.exports = { getData };
