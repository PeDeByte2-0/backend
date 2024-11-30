require('dotenv').config();
const { connectDatabase } = require('./database');  // Ajuste o caminho se necessário
const app = require('../app');  // Importa o app configurado no app.js

async function startServer() {
  try {
    await connectDatabase();  // Conecta ao banco de dados

    // Inicia o servidor na porta 8080
    app.listen(8080, () => {
      console.log('Servidor rodando na porta 8080');

    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

module.exports = startServer; 
