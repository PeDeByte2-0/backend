const express = require("express");
const { getData, getDataById, getDataHours, setDataProfessional, updateData, inativateDataProfesional } = require('../2controllers/professionalController');
const router = express.Router();

console.log('Rotas /professionals carregada');

//Método: GET | URL: http://localhost:8080/api/professionals
//Retorna todos os profissionais ativos no sistema
router.get('/professionals', (req, res, next) => {
    console.log('Requisição recebida em /professionals')
    getData(req, res, next);
});

//Método: GET | URL: http://localhost:8080/api/professionals/id
//Retorna o profissional com a ID indicada (Passar a ID do profissional)
router.get('/professionals/:id', (req, res, next) => {
    console.log('Requisição recebida em /professionals/:id');
    getDataById(req, res, next);
});

//Método: GET | URL: http://localhost:8080/api/professionals/id
//Retorna as horas de atendimento do profissional (Passar ID do profissional)
router.get('/professionals/hour/:id', (req, res, next) => {
    console.log('Requisição recebida em /professionals/hour/:id');
    getDataHours(req, res, next);
});


//Método: POST | URL: http://localhost:8080/api/professionals
//Exemplo para criação (POST) de Proffisional
// {
//     "idSchool": "2",
//     "firstName": "Carlos",
//     "lastName": "Madeira",
//     "cpf": "11052977995",
//     "celular": "999055949",
//     "celular2": "998605544",
//     "responsavel": "Ataide Mariot",
//     "obs": "affs",
//     "specialityId": "3",
//     "AvailableHoursId": ["2", "3"]
// }
router.post('/professionals', async (req, res, next) => {
    console.log('Requisição recebida em /professionals');
    setDataProfessional(req, res, next);
});

//Método: POST | URL: http://localhost:8080/api/professionals/id
//Exemplo para edição (PUT) de profissional (Passar id do profissional)
// {
//     "idSchool": "2",
//     "firstName": "Carlos",
//     "lastName": "Madeira",
//     "cpf": "11052977995",
//     "celular": "999055949",
//     "obs": "affs",
//     "specialityId": "3",
//     "AvailableHoursId": ["2", "3"]
// }
router.put('/professionals/:id', async (req, res, next) => {
    console.log('Requisição recebida em /professionals/:id');
    updateData(req, res, next);
});

//Método: PUT | URL: http://localhost:8080/api/professionals/id
//Inativa o profissional e as horas agendadas do mesmo (Passar ID do profissional)
router.put('/professionals/inativate/:id', async (req, res, next) => {
    console.log('Requisição recebida em /professionals/inativate/:id');
    inativateDataProfesional(req, res, next);
});

module.exports = router;