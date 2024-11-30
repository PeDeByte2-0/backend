// src/app.js
const express = require('express');

const hoursRoutes = require('./3routes/hoursRoutes'); // Suas rotas
const memberRoutes = require('./3routes/memberRoutes'); // Suas rotas
const personRoutes = require('./3routes/personRoutes'); // Suas rotas
const personDataRoutes = require('./3routes/personDataRoutes'); // Suas rotas
const professionalRoutes = require('./3routes/professionalRoutes'); // Suas rotas
const schoolRoutes = require('./3routes/schoolRoutes'); // Suas rotas
const specialityRoutes = require('./3routes/specialityRoutes'); // Suas rotas
const weekProfileRoutes = require('./3routes/weekProfileRoutes'); // Suas rotas
const studentsRoutes = require('./3routes/studentsRoutes');
const authRoutes = require('./3routes/authRoutes')

const app = express();

app.use(express.json());  // Se você for enviar/receber JSON, adicione esse middleware
app.use('/api', schoolRoutes);  // Define a base para as rotas
app.use('/api', memberRoutes);  // Define a base para as rotas
app.use('/api', personRoutes);  // Define a base para as rotas
app.use('/api', personDataRoutes);  // Define a base para as rotas
app.use('/api', professionalRoutes);  // Define a base para as rotas
app.use('/api', hoursRoutes);  // Define a base para as rotas
app.use('/api', specialityRoutes);  // Define a base para as rotas
app.use('/api', weekProfileRoutes);  // Define a base para as rotas
app.use('/api', studentsRoutes);  // Define a base para as
app.use('/api', authRoutes); // Define a base para as rotas
module.exports = app;
