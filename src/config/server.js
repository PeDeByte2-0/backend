require('dotenv').config();
const express = require('express');
const { connectDatabase } = require('./database');
const { exemploService } = require("../services/exemploService")

const app = express();

async function startServer() {
  try {
    await connectDatabase();
    console.log("Conexão com o banco de dados bem-sucedida.");
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
