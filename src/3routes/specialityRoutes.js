// src/routes/specialityRoutes.js
const express = require('express');
const { getData, getDataById } = require('../2controllers/specialityController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/speciality', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/speciality/:id', async (req, res, next) => {
  console.log('Requisição recebida em /speciality/:id');

  try {
    const specialityId = req.params.id;
    const speciality = await getDataById(specialityId);
    res.status(200).json(speciality);
  } catch (error) {
    console.error('Erro ao buscar especialidade:', error);
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
