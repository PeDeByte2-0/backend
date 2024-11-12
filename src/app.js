// src/app.js
const express = require('express');
const exemploRoutes = require('./routes/exemploRoutes'); // Suas rotas
const specialityRoutes = require('./routes/specialityRoutes'); // Suas rotas
const app = express();

app.use(express.json());  // Se você for enviar/receber JSON, adicione esse middleware
app.use('/api', exemploRoutes);  // Define a base para as rotas
app.use('/api', specialityRoutes);  // Define a base para as rotas
module.exports = app;
