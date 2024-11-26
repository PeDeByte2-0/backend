// src/routes/weekProfileRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/weekProfileController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/weekProfile', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/weekProfile/:id', async (req, res, next) => {
  console.log('Requisição recebida em /weekProfile/:id');
  getDataById(req, res, next);
});

router.post('/weekProfile', async (req, res, next) => {
  console.log('Requisição recebida em /weekProfile');
  setData(req, res, next);
});

router.put('/weekProfile/:id', async (req, res, next) => {
  console.log('Requisição recebida em /weekProfile/:id');
  updateData(req, res, next);
});

router.delete('/weekProfile/:id', async (req, res, next) => {
  console.log('Requisição recebida em /weekProfile/:id');
  deleteData(req, res, next);
});
module.exports = router;
