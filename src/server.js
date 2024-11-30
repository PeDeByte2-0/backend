require('dotenv').config();
const express = require('express');
const { connectDatabase } = require('./0config/database');

const app = express();

async function startServer() {
  try {
    await connectDatabase();
    console.log("Conexão com o banco de dados bem-sucedida.");
    app.listen(8080, () => {
      console.log('Servidor rodando na porta 8080');
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
