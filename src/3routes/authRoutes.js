const express = require('express');
const authController = require('../2controllers/authController');

const authRoutes = express.Router();

// Rota de login
authRoutes.post('/login', authController.login);

module.exports = authRoutes;
