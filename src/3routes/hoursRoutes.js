// src/routes/hoursRoutes.js
const express = require('express');
const { getHours, getById, createData, updateData, deleteData } = require('../2controllers/hoursController');
const router = express.Router();

console.log('Rota /hours carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/hours', (req, res, next) => {
  console.log('Requisição recebida em /hours'); // Esta linha será impressa sempre que essa rota for acessada
  getHours(req, res, next);
});

router.get('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  getById(req, res, next);
});

router.post('/hours', async (req, res, next) => {
  console.log('Requisição recebida em /hours');
  createData(req, res, next);
});

router.put('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  updateData(req, res, next);
});

router.delete('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  deleteData(req, res, next);
});

module.exports = router;
