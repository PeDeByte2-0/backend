// src/routes/personDataRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/personDataController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/personData', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/personData/:id', async (req, res, next) => {
  console.log('Requisição recebida em /personData/:id');
  getDataById(req, res, next);
});

router.post('/personData', async (req, res, next) => {
  console.log('Requisição recebida em /personData');
  setData(req, res, next);
});

router.put('/personData/:id', async (req, res, next) => {
  console.log('Requisição recebida em /personData/:id');
  updateData(req, res, next);
});

router.delete('/personData/:id', async (req, res, next) => {
  console.log('Requisição recebida em /personData/:id');
  deleteData(req, res, next);
});
module.exports = router;
