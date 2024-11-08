// src/routes/exemploRoutes.js
const express = require('express');
const { getData } = require('../controllers/exemploController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/dados', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  getData(req, res, next);
});

module.exports = router;
