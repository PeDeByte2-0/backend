const {getAllStudents, getavailablestudenthours, getSpecialityFromStudent, createStudent, inativateStudent} = require('../1services/StudentsService');

async function getData(req, res){
    try {
        console.log("getStudents");

        const data = await getAllStudents();
        res.json(data);
    } catch (err) {
        res.status(500).send('Erro ao buscar controller');
    }
}

async function getDataHours(req, res) {
    try {
        console.log('GetDataHours');
        const personId = req.params.id;
        const data = await getavailablestudenthours(personId);
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
        res.status(500).send('Erro ao buscar controller');
    }
}

async function setDataStudent(req, res) {
    try {
        const {idSchool, firstName, lastName, cpf, celular, obs, idAvalilablehours, specialits} = req.body;

        const newStudent = await createStudent(idSchool, firstName, lastName, cpf, celular, obs, idAvalilablehours, specialits);
        res.status(201).sjon(newStudent);
    } catch (err) {
        res.status(500).send ('Erro ao criar novo estudante: ' +err.message);
    }
}

async function inativateDataStudent(req, res) {
    try {
        const {id} = req.body;
        
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
    getDataHours,
    getDataNecessity,
    setDataStudent,
    inativateDataStudent
}