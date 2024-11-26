// src/routes/memberRoutes.js
const express = require('express');
const { getData, getDataById, setData, updateData, deleteData } = require('../2controllers/memberController');
const router = express.Router();

console.log('Rota /dados carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/member', (req, res, next) => {
  console.log('Requisição recebida em /dados'); // Esta linha será impressa sempre que essa rota for acessada
  
  getData(req, res, next);
});

router.get('/member/:id', async (req, res, next) => {
  console.log('Requisição recebida em /member/:id');
  getDataById(req, res, next);
});

router.post('/member', async (req, res, next) => {
  console.log('Requisição recebida em /member');
  setData(req, res, next);
});

router.put('/member/:id', async (req, res, next) => {
  console.log('Requisição recebida em /member/:id');
  updateData(req, res, next);
});

router.delete('/member/:id', async (req, res, next) => {
  console.log('Requisição recebida em /member/:id');
  deleteData(req, res, next);
});
module.exports = router;
