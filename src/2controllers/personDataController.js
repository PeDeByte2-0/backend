// src/controllers/exemploController.js
const { getAllPersonDatasData, getPersonDataById, createPersonData, updatePersonData, deletePersonData} = require('../1services/personDataService');
const { getPersonById } = require('../1services/personService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllPersonDatasData();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const personDataId = req.params.id;
    const data = await getPersonDataById(personDataId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
async function setData(req, res) {
  try {
    const { idPerson, firstName, lastName, cpf, celular } = req.body;

    if (!idPerson || !firstName || !lastName || !cpf || !celular) {
      return res.status(400).json({ message: 'Os campos "idPerson", "firstName", "lastName", "cpf" e "celular" são obrigatórios.' });
    }

    // Criar dados pessoais relacionados em tb_person_data
    const newPersonData = await createPersonData(idPerson, firstName, lastName, cpf, celular);

    // Você pode adicionar a consulta de dados da pessoa aqui, caso queira incluir mais informações sobre a pessoa
    const person = await getPersonById(idPerson);

    res.status(201).json({ person, personData: newPersonData });
  } catch (err) {
    res.status(500).send('Erro ao criar nova pessoa: ' + err.message);
  }
}

async function updateData(req, res) {
  try {
    const { idPerson, firstName, lastName, cpf, celular } = req.body;
    const personId = req.params.id;

    if (!idPerson || !firstName || !lastName || !cpf || !celular) {
      return res.status(400).json({ message: 'Os campos "idPerson", "firstName", "lastName", "cpf" e "celular" são obrigatórios.' });
    }

    // Atualizar dados pessoais em tb_person_data
    const updatedPersonData = await updatePersonData(personId, firstName, lastName, cpf, celular);

    // Verifique se os dados foram atualizados com sucesso
    if (updatedPersonData) {
      // Você pode retornar os dados da pessoa (idPerson) aqui, se necessário
      const person = await getPersonById(personId);

      return res.status(200).json({ person, personData: updatedPersonData });
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada ou não foi possível atualizar os dados.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pessoa.', error: err.message });
  }
}


async function deleteData(req, res) {
  try {
    const personDataId = req.params.id;
    const data = await deletePersonData(personDataId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
