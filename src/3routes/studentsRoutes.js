const express = require('express');
const {getData, getDataHours, getDataNecessity, setDataStudent, inativateDataStudent, updateData, getDataById, getDataByName} = require('../2controllers/studentController');
const router = express.Router();

console.log('Rotas /students carregada');

//Método: GET | URL: http://localhost:8080/api/students
//Retorna todos os estudantes ativos no sistema
router.get('/students', (req, res, next) => {
    console.log('Requisição recebida em /students');
    getData(req, res, next);
});

//Método: GET | URL: http://localhost:8080/api/students/id
//Retorna o estudante ativo e com id informada (Passar id do esudante)
router.get('/students/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/:id');
    getDataById(req, res, next);
})

//Método: POST | URL: http://localhost:8080/api/students/name
//Exemplo do BODY:
//{
//    "name": "mar"
//}
//O método é um POST, mas retorna todos os estudantes com nome ou sobrenome que encaixem na pesquisa
router.post('/students/name', (req, res, next) => {
    console.log('Requisição recebida em /studens/name');
    getDataByName(req, res, next);
}) 

//Método: GET | URL: http://localhost:8080/api/students/hour/:id
//Retorna todos os horários de disponibilidade do estudante (Passar id do estudante)
router.get('/students/hour/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/hour/:id');
    getDataHours(req, res, next);
})

//Método: GET | URL: http://localhost:8080/api/students/necessity/:id
//Retorna todas as necessidades vinculadas ao estudante (Passar id do estudante)
router.get('/students/necessity/:id', (req, res, next) => {
    console.log('Requisição recebida em /students/necessity/:id');
    getDataNecessity(req, res, next);
})

//Método: POST | URL: http://localhost:8080/api/students
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
router.post('/students', async (req, res, next) => {
    console.log('Requisição recebida em /student/:id');
    setDataStudent(req, res, next);
})

//Método: POST | URL: http://localhost:8080/api/students/:id
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
router.put('/students/:id', async (req, res, next) => {
    console.log('Requisição recebida em /student/:id');
    updateData(req, res, next);
})

//Método: PUT | URL: http://localhost:8080/api/students/:id
//Inativa o estudante e as horas agendadas do mesmo (Passar ID do estudante)
router.put('/students/inativate/:id', async (req, res, next) => {
    console.log('Requisição recebida em /students/inativate/:id');
    inativateDataStudent(req, res, next);
    
})

module.exports = router;