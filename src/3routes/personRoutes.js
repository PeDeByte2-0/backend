// src/routes/personRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/personController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/person', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/person/:id', async (req, res, next) => {
  console.log('Requisição recebida em /person/:id');
  getDataById(req, res, next);
});

router.post('/person', async (req, res, next) => {
  console.log('Requisição recebida em /person');
  setData(req, res, next);
});

router.put('/person/:id', async (req, res, next) => {
  console.log('Requisição recebida em /person/:id');
  updateData(req, res, next);
});

router.delete('/person/:id', async (req, res, next) => {
  console.log('Requisição recebida em /person/:id');
  deleteData(req, res, next);
});
module.exports = router;
