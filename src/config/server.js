const express = require('express');
const { connectDatabase } = require('./database');

const app = express();
connectDatabase();

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000, config/server.js');
});
