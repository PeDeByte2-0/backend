const express = require('express');
const {getData, getDataHours, getDataNecessity, setDataStudent, inativateDataStudent, updateData, getDataById} = require('../2controllers/studentController');
const router = express.Router();

console.log('Rotas /students carregada');

router.get('/students', (req, res, next) => {
    console.log('Requisição recebida em /students');
    getData(req, res, next);
});

router.get('/students/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/:id');
    getDataById(req, res, next);
})

router.get('/students/hour/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/hour/:id');
    getDataHours(req, res, next);
})

router.get('/students/necessity/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/necessity/:id');
    getDataNecessity(req, res, next);
})

//Exemplo para criação (POST) de aluno
// {
//     "idSchool": "1",
//     "firstName": "Mateus",
//     "lastName": "Martignago Mariot",
//     "cpf": "11052977995",
//     "celular": "999055949",
//     "celular2": "998605544",
//     "responsavel": "Ataide Mariot",
//     "obs": "affs",
//     "idAvalilablehours": ["1"], 
//     "specialits": ["1"]
// }

router.post('/students/', async (req, res, next) => {
    console.log('Requisição recebida em /student/:id');
    setDataStudent(req, res, next);
})

//Exemplo para edição (PUT) de aluno
// {
//     "idSchool": "1",
//     "firstName": "Mateus",
//     "lastName": "Martignago Mariot",
//     "cpf": "11052977995",
//     "celular": "999055949",
//     "celular2": "998605544",
//     "responsavel": "Ataide Mariot",
//     "obs": "affs",
//     "idAvalilablehours": ["1"], 
//     "specialits": ["1"]
// }

router.put('/students/:id', async (req, res, next) => {
    console.log('Requisição recebida em /student/:id');
    updateData(req, res, next);
})

router.put('/students/inativate/:id', async (req, res, next) => {
    console.log('Requisição recebida em /student/inativate/:id');
    inativateDataStudent(req, res, next);
    
})

module.exports = router;