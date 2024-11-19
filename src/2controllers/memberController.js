// src/controllers/exemploController.js
const { getAllMembers, getMemberById, createMember, updateMember, deleteMember} = require('../1services/memberService');

async function getData(req, res) {
  try {
    console.log("getData");
    
    const data = await getAllMembers();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}


async function getDataById(req, res) {
  try {
    console.log("getData");
    const memberId = req.params.id;
    const data = await getMemberById(memberId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}

async function setData(req, res) {
  try {
    const { personId, obs } = req.body;

    // Verifica se os parâmetros obrigatórios foram fornecidos
    if (!personId || !obs) {
      return res.status(400).json({ message: 'Os campos "personId" e "obs" são obrigatórios.' });
    }

    // Cria o membro
    const newMember = await createMember(personId, obs);
    res.status(201).json(newMember); // Retorna o membro recém-criado
  } catch (err) {
    res.status(500).send('Erro ao criar membro: ' + err.message);
  }
}
async function updateData(req, res) {
  try {
    const { obs } = req.body; // Atualiza apenas a observação
    const memberId = req.params.id; // ID do membro a ser atualizado

    // Verifica se o campo "obs" foi fornecido
    if (!obs) {
      return res.status(400).json({ message: 'O campo "obs" é obrigatório.' });
    }

    // Atualiza o membro
    const updatedMember = await updateMember(memberId, obs);

    // Se o membro foi encontrado e atualizado
    if (updatedMember) {
      return res.status(200).json(updatedMember); // Retorna o membro atualizado
    } else {
      return res.status(404).json({ message: 'Membro não encontrado.' }); // Caso o ID não exista
    }

  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar membro.', error: err.message });
  }
}


async function deleteData(req, res) {
  try {
    const memberId = req.params.id;
    const data = await deleteMember(memberId);
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar dados controller');
  }
}
module.exports = { getData, getDataById, setData, updateData, deleteData };
