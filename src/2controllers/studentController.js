const {getAllStudents,  createStudent, inativateStudent, updateStudent, getStudentById} = require('../1services/StudentsService');
const {getSpecialityFromStudent} = require('../1services/necessityService');
const {getavailablehours} = require('../1services/availableHoursServise');

async function getData(req, res){
    try {
        console.log("getStudents");

        const data = await getAllStudents();
        res.json(data);
    } catch (err) {
        res.status(500).send('Erro ao buscar controller');
    }
}

async function getDataById(req, res) {
    try {
        console.log("GetDataById");
        const PersonId = req.params.id
        const data = await getStudentById(PersonId);
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

async function getDataNecessity(req, res) {
    try{
        console.log('getDataNecessity');
        const personId = req.params.id;
        const data = await getSpecialityFromStudent(personId);
        res.json(data);
    }catch(err){
        res.status(500).send(`Erro ao buscar controller ${err}`);
    }
}

async function setDataStudent(req, res) {
    try {
        const {idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, specialits} = req.body;

        const newStudent = await createStudent(idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, specialits);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).send ('Erro ao criar novo estudante: ' +err.message);
    }
}

async function updateData(req, res) {
    
    try {
        const {idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, specialits} = req.body;

        const PersonId = req.params.id;

        if (!PersonId || !firstName || !lastName || !cpf || !celular) {
            return res.status(400).json({ message: 'Os campos "idPerson", "firstName", "lastName", "cpf" e "celular" são obrigatórios.' });
        }

        const updatedStudent = await updateStudent(PersonId, idSchool, firstName, lastName, cpf, celular, celular2, responsavel, obs, idAvalilablehours, specialits);

        if(updatedStudent){
            const student = await getStudentById(PersonId);

            return res.status(200).json({student, studentData: updatedStudent});
        }else{
            console.log(`Teste: ${updatedStudent}`);
            return res.status(404).json({ message: 'Estudante não encontrada ou não foi possível atualizar os dados.' });
        }
    } catch (err) {
        res.status(500).send ('Erro ao atualizar o estudante: ' +err.message);
    }
}

async function inativateDataStudent(req, res) {
    try {
        const id = req.params.id;
        
        const updatedStudent = await inativateStudent(id);

        if(updatedStudent){
            return res.status(200).json(updatedStudent);
        }else{
            return res.status(404).json({message: 'Estudante não encontrada.'});
        }
    } catch (err) {
        res.status(500).json({message: 'Erro ao inativar estudante.', error: err.message});
    }
}

module.exports = {
    getData,
    getDataById,
    getDataHours,
    getDataNecessity,
    setDataStudent,
    updateData,
    inativateDataStudent,
}