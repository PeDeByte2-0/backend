const express = require('express');
const {getData, getDataHours, getDataNecessity, setDataProfessional, inativateDataProfessional, updateData, getDataById} = require('../2controllers/professionalController');
const router = express.Router();

console.log('Rotas /professionals carregada');

router.get('/professionals', (req, res, next) => {
    console.log('Requisição recebida em /professionals');
    getData(req, res, next);
});

router.get('/professionals/:id', (req, res, next) => {
    console.log('Requisição recebida em /professionals/:id');
    getDataById(req, res, next);
})

router.get('/professionals/hour/:id', (req, res, next) => {
    console.log('Requisição recebida em /professionals/hour/:id');
    getDataHours(req, res, next);
})

// router.get('/professionals/necessity/:id', (req, res, next) => {
//     console.log('Requisição recebida em /professionals/necessity/:id');
//     getDataNecessity(req, res, next);
// })

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

router.post('/professionals/', async (req, res, next) => {
    console.log('Requisição recebida em /professional/:id');
    setDataProfessional(req, res, next);
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
//     "idAvalilablehours": ["2", "3"], 
//     "specialits": ["2", "3"]
// }

router.put('/professionals/:id', async (req, res, next) => {
    console.log('Requisição recebida em /professional/:id');
    updateData(req, res, next);
})

router.put('/professionals/inativate/:id', async (req, res, next) => {
    console.log('Requisição recebida em /professional/inativate/:id');
    inativateDataProfessional(req, res, next);
    
})

module.exports = router;