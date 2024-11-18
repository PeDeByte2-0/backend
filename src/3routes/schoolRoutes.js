// src/routes/schoolRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/schoolController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/school', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/school/:id', async (req, res, next) => {
  console.log('Requisição recebida em /school/:id');
  getDataById(req, res, next);
});

router.post('/school', async (req, res, next) => {
  console.log('Requisição recebida em /school');
  setData(req, res, next);
});

router.put('/school/:id', async (req, res, next) => {
  console.log('Requisição recebida em /school/:id');
  updateData(req, res, next);
});

router.delete('/school/:id', async (req, res, next) => {
  console.log('Requisição recebida em /school/:id');
  deleteData(req, res, next);
});
module.exports = router;
