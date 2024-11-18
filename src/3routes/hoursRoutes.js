// src/routes/hoursRoutes.js
const express = require('express');
const { getHours, getHourById, createHour, updateHour, deleteHour } = require('../2controllers/hoursController');
const router = express.Router();

console.log('Rota /hours carregada'); // Esta linha imprimirá uma mensagem no console quando o arquivo for importado

router.get('/hours', (req, res, next) => {
  console.log('Requisição recebida em /hours'); // Esta linha será impressa sempre que essa rota for acessada
  getHours(req, res, next);
});

router.get('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  getHourById(req, res, next);
});

router.post('/hours', async (req, res, next) => {
  console.log('Requisição recebida em /hours');
  createHour(req, res, next);
});

router.put('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  updateHour(req, res, next);
});

router.delete('/hours/:id', async (req, res, next) => {
  console.log('Requisição recebida em /hours/:id');
  deleteHour(req, res, next);
});

module.exports = router;
