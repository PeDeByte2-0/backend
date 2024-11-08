// src/controllers/exemploController.js
const { getAllData } = require('../services/exemploService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllData();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

module.exports = { getData };
