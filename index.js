// src/app.js
const express = require('express');
const exemploRoutes = require('./src/routes/exemploRoutes');
const app = express();

app.use('/api', exemploRoutes);

module.exports = app;
