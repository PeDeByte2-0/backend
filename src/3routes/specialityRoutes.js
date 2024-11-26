// src/routes/specialityRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/specialityController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/speciality', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/speciality/:id', async (req, res, next) => {
  console.log('Requisição recebida em /speciality/:id');
  getDataById(req, res, next);
});

router.post('/speciality', async (req, res, next) => {
  console.log('Requisição recebida em /speciality');
  setData(req, res, next);
});

router.put('/speciality/:id', async (req, res, next) => {
  console.log('Requisição recebida em /speciality/:id');
  updateData(req, res, next);
});

router.delete('/speciality/:id', async (req, res, next) => {
  console.log('Requisição recebida em /speciality/:id');
  deleteData(req, res, next);
});
module.exports = router;
