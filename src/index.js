require('dotenv').config();
const express = require('express');
const { connectDatabase } = require('./config/database');
const { getAllData, insertData } = require('./services/exemploService');
const exemploRoutes = require('./routes/exemploRoutes'); // Importando as rotas


const router = express.Router();
const app = express();

app.use('/api', exemploRoutes);

const PORT = 3000;
app.use(express.json());

async function startServer() {
  try {
    await connectDatabase();
    console.log('Conexão com o banco de dados bem-sucedida.');

    app.get('/specialities', async (req, res) => {
      try {
        const data = await getAllData();
        res.json(data);
      } catch (error) {
        res.status(500).send('Erro ao buscar dados.');
      }
    });

    app.post('/specialities', async (req, res) => {
      console.log('Corpo da requisição:', req.body);
      const { name } = req.body; //pega o nome da especialidade
      if (!name){
        return res.status(400).send('Nome da especialidade obrigatorio.');
      }

        try {
          const newSpeciality = await insertData(name);
          res.status(201).json(newSpeciality);
        } catch (error) {
          console.error('Erro ao inserir dados:', error);
          res.status(500).send('Erro ao inseir dados.');
        }
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();