const {getAllProfessionals,  createProfessional, inativateProfessional, updateProfessional, getProfessionalById} = require('../1services/ProfessionalsService');
const {getavailablehours} = require('../1services/availableHoursServise');

async function getData(req, res){
    try {
        console.log("getProfessionals");

        const data = await getAllProfessionals();
        res.json(data);
    } catch (err) {
        res.status(500).send('Erro ao buscar controller');
    }
}

async function getDataById(req, res) {
    try {
        console.log("GetDataById");
        const PersonId = req.params.id
        const data = await getProfessionalById(PersonId);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados controller');
    }
}

async function getDataHours(req, res) {
    try {
        console.log('GetDataHours');
        const personId = req.params.id;
        const data = await getavailablehours(personId);
        res.json(data);
    } catch (err) {
        res.status(500).send('Erro ao buscar controller');
    }
}

async function setDataProfessional(req, res) {
    try {
        const {idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, speciality} = req.body;
        console.log("req",req.body);
        
        const newProfessional = await createProfessional(idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, speciality);
        res.status(201).json(newProfessional);
    } catch (err) {
        res.status(500).send ('Erro ao criar novo profissioal: ' +err.message);
    }
}

async function updateData(req, res) {
    
    try {
        const {idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, speciality} = req.body;

        const PersonId = req.params.id;

        if (!PersonId || !firstName || !lastName || !cpf || !celular) {
            return res.status(400).json({ message: 'Os campos "idPerson", "firstName", "lastName", "cpf" e "celular" são obrigatórios.' });
        }

        const updatedProfessional = await updateProfessional(PersonId, idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, speciality);

        if(updatedProfessional){
            const professional = await getProfessionalById(PersonId);

            return res.status(200).json({professional, professionalData: updatedProfessional});
        }else{
            console.log(`Teste: ${updatedProfessional}`);
            return res.status(404).json({ message: 'profissional não encontrada ou não foi possível atualizar os dados.' });
        }
    } catch (err) {
        res.status(500).send ('Erro ao atualizar o profissional: ' +err.message);
    }
}

async function inativateDataProfessional(req, res) {
    try {
        const id = req.params.id;
        
        const updatedProfessional = await inativateProfessional(id);

        if(updatedProfessional){
            return res.status(200).json(updatedProfessional);
        }else{
            return res.status(404).json({message: 'profissional não encontrada.'});
        }
    } catch (err) {
        res.status(500).json({message: 'Erro ao inativar profissional.', error: err.message});
    }
}

module.exports = {
    getData,
    getDataById,
    getDataHours,
    setDataProfessional,
    updateData,
    inativateDataProfessional,
}