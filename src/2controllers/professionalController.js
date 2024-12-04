
const {getavailablehours} = require('../1services/availableHoursServise');
const {getAllProfessionals, getProfessionalById, createProfessionals, updateProdessionals, inativateProfessional, getProfessionalByName} = require('../1services/professionalsSerice');

async function getData(req, res) {
    
    try {
        
        console.log('getProfessionals');

        const data = await getAllProfessionals();
        res.json(data);

    } catch (err) {
        res.status(500).send('Erro ao buscar controller');
    }

}

async function getDataById(req, res) {
    
    try {
        
        console.log('getProfessionalById');

        const PersonId = req.params.id;
        const data = await getProfessionalById(PersonId);

        res.status(200).json(data);

    } catch (err) {
        
        res.status(500).send('Erro ao buscar controller');

    }

}

async function getDataByName(req, res) {
    try {
        console.log("getDataByname");
        const {name} = req.body;
        const data = await getProfessionalByName(name);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send(`Erro ao buscar controler: ${err}`);
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
        
        const {idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId} = req.body;

        const newProfessional = await createProfessionals(idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId);

        res.status(201).json(newProfessional);

    } catch (err) {
        
        res.status(500).send(`Erro ao criar novo profissional: ${err.message}`);

    }


}

async function updateData(req, res) {
    
    try {

        
        const {idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId} = req.body


        const PersonId = req.params.id;

        if (!PersonId || !firstName || !lastName || !cpf || !celular) {
            return res.status(400).json({ message: 'Os campos "idPerson", "firstName", "lastName", "cpf" e "celular" são obrigatórios.' });
        }


        const updatedPrfessional = await updateProdessionals(PersonId,idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId);

        if(updatedPrfessional){

            const professional = await getProfessionalById(PersonId);

            return res.status(200).json({professional, professionalData: updatedPrfessional});

        }else{

            return res.status(404).json({message: 'Profissional não encontrado ou não foi possível atualizar os dados'});

        }
    } catch (err) {
        
        res.status(500).send(`Erro ao atualizar o profissional ${err.message}`);

    }

}

async function inativateDataProfesional(req, res) {
    
    try {
        
        const PersonId = req.params.id;

        const updatedPrfessional = await inativateProfessional(PersonId);

        if(updatedPrfessional){

            return res.status(200).json(updatedPrfessional);

        }else{
            
            return res.status(404).json({message: 'Profissional não encontrado ou não foi possível atualiza-lo'});

        }

    } catch (err) {
        
        res.status(500).json({message: `Erro ao inativar o profissional: ${err.message}`});

    }

}

module.exports = {
    getData,
    getDataById,
    getDataHours,
    getDataByName,
    setDataProfessional,
    updateData,
    inativateDataProfesional,
}