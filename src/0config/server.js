require('dotenv').config();
const { connectDatabase } = require('./database');  // Ajuste o caminho se necessário
const app = require('../app');  // Importa o app configurado no app.js

async function startServer() {
  try {
    await connectDatabase();  // Conecta ao banco de dados

    // Inicia o servidor na porta 3000
    app.listen(3001, () => {
      console.log('Servidor rodando na porta 3001');
      console.log('http://localhost:3001');
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

module.exports = startServer; 
