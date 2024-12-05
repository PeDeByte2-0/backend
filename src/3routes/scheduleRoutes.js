const express = require('express');
const {getFreeData,getMatchingProfessionalData, getScheduledData, getAllDataScheduling, insertSchedulingData, unscheduleData, getMachedData, getScheduledDataByNameandDay} = require('../2controllers/schedule.controller');
const router = express.Router();

//Método: GET | URL: http://localhost:8080/api/schedule/scheduledTime/(id)
//Retorna todos os horários agendados para o estudante ou profissional (Passar id do estudante ou profissional)
router.get('/schedule/scheduledTime/:id', (req, res, next) => {
    
    console.log('Requisição recebida em /schedule/scheduledTime/:id');
    getScheduledData(req, res, next);

});

//Método: GET | URL: http://localhost:8080/api/schedule/scheduledTime/(id)
//Retorna todos os horários agendados para o estudante ou profissional (Passar id do estudante ou profissional)
router.get('/schedule/matchingProfessional/:id', (req, res, next) => {
    
    console.log('Requisição recebida em /schedule/matchingProfessional/:id');
    getMatchingProfessionalData(req, res, next);

});


//Método: GET | URL: http://localhost:8080/api/schedule/freeTime/(id)
//Retorna todos os horários livres para o estudante ou profissional (Passar id do estudante ou profissional)
router.get('/schedule/freeTime/:id', (req, res, next) => {

    console.log('Requisição recebida em /schedule/freeTime/:id');
    getFreeData(req, res, next);

});


//Método: PUT | URL: http://localhost:8080/api/schedule/nameAndDay
//Usa o método PUT para fazer um SELECT  e retornar apenas as horas pelo nome e dia da semana selecionado
//Exemplo de BODY (Passamos os nome pesquisado e Di da semana)
// {
        // "PersonName" : "", 
        // "WeekDayId": ""
// }
router.put('/schedule/nameAndDay', (req, res, next) => {

    console.log('Requisição recebida em /schedule/nameAndDay')
    getScheduledDataByNameandDay(req, res, next);
});

//Método: PUT | URL: http://localhost:8080/api/schedule/match
//Usa o método PUT para fazer um SELECT  e retornar apenas as horas que ambos profissional e estudante tem disponíveis para consulta
//Exemplo de BODY (Passamos os ids necessários para a busca no próprio BODY)
// {
//     "StudentId" : "48", 
//     "ProfessionalId" : "51"
// }
router.put('/schedule/match', (req, res, next) => {

    console.log('Requisição recebida em /schedule/match');
    getMachedData(req, res, next);

});

//Método: GET | URL: http://localhost:8080/api/schedule/scheduling/
//Retorna todos os agendamentos para atendimentos existentes
router.get('/schedule/scheduling/', (req, res, next) => {

    console.log('Requisição recebida em /schedule/scheduling/');
    getAllDataScheduling(req, res, next);

});

//Método: POST | URL: http://localhost:8080/api/schedule
//Usa o método POST para criar um novo agendamento de atendimento e trancar o horário para novos agendamentos(Passar os IDs necessários conforme exemplo)
//Exemplo de BODY
// {
//     "StudentId" : "48", 
//     "ProfessionalId" : "51", 
//     "HoursId" : "2"
// }
router.post('/schedule', (req, res, next) => {

    console.log('Requisição recebida em /scheduling');
    insertSchedulingData(req, res, next);

});


//Método: PUT | URL: http://localhost:8080/api/schedule/unscheduling
//Usa o método PUT para inativar o agendamento do atendimento e liberar o horário para novos (Passar os IDs necessários conforme exemplo)
//Exemplo de BODY
// {
//     "StudentId" : "48", 
//     "ProfessionalId" : "51", 
//     "HoursId" : "2"
// }
router.put('/schedule/unscheduling', (req, res, next) => {
    console.log('Requisição reccebida em /schedule/unscheduling');
    unscheduleData(req, res, next);
});

module.exports = router;