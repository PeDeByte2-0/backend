// src/controllers/exemploController.js
const { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson} = require('../1services/personService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllPersons();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const personId = req.params.id;
    const data = await getPersonById(personId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

async function setData(req, res) {
  try {
    const { active, idSchool } = req.body;

    if (active === undefined || !idSchool) {
      return res.status(400).json({ message: 'Os campos "active" e "idSchool" são obrigatórios.' });
    }

    const newPerson = await createPerson(active, idSchool);
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(500).send('Erro ao criar nova pessoa: ' + err.message);
  }
}

async function updateData(req, res) {
  try {
    const { active, idSchool } = req.body;
    const personId = req.params.id;

    if (active === undefined || !idSchool) {
      return res.status(400).json({ message: 'Os campos "active" e "idSchool" são obrigatórios.' });
    }

    const updatedPerson = await updatePerson(personId, active, idSchool);

    if (updatedPerson) {
      return res.status(200).json(updatedPerson); // Atualização bem-sucedida
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada.' }); // Caso o ID não exista
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pessoa.', error: err.message });
  }
}


async function deleteData(req, res) {
  try {
    const personId = req.params.id;
    const data = await deletePerson(personId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
