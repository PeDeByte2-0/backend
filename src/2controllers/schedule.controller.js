const {getFreeTimeById, getScheduledTimeById, getAllScheduling, insertSchedulingHour, unschedule, getMatchedHours, getSchedulingByPersonName, getSchedulingByPersonNameandweekday} = require('../1services/scheduleService');


async function getFreeData(req, res) {
    
    try {

        const PersonId = req.params.id

        const data = await getFreeTimeById(PersonId);
        res.json(data);

    } catch (err) {
        
        console.error('Erro ao buscar consulta')
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function getScheduledData(req, res) {
    
    try {
        
        const PersonId = req.params.id;
        const data = await getScheduledTimeById(PersonId);
        res.json(data)

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function getScheduledDataByNameandDay(req, res) {
    
    try {
        
        const {PersonName, WeekDayId} = req.body;
        console.log(`WeekDay: ${WeekDayId}`)
        if(WeekDayId == 7){
            const data = await getSchedulingByPersonName(PersonName);
            return res.status(200).json(data);
        }else{
            const data = await getSchedulingByPersonNameandweekday(PersonName, WeekDayId);
            return res.status(200).json(data)
        }

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function getMachedData(req, res){

    try {
        
        console.log('getMatchedData')
        const {StudentId, ProfessionalId} = req.body;
        const data = await getMatchedHours(StudentId, ProfessionalId);
        return res.status(200).json(data)

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function getAllDataScheduling(req, res) {
    
    try {
        
        const data = await getAllScheduling();
        res.json(data);

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function insertSchedulingData(req, res) {
    
    try {
        
        const {StudentId, ProfessionalId, HoursId} = req.body;
        const data = await insertSchedulingHour(StudentId, ProfessionalId, HoursId);
        
        if(data){
            return res.status(200).send('Horário agendado');
        }else{
            return res.status(404).send('Favor verificar informações enviadas. Hora não agendada');
        }
        
    } catch (err) {

        res.status(500).json({message: 'Erro ao agendar horário ', error: err.message});
        
    }
}

async function unscheduleData(req, res) {
    
    try {
        
        const {StudentId, ProfessionalId, HoursId} = req.body;
        const data = await unschedule(StudentId, ProfessionalId, HoursId);

        if(data){
            return res.status(200).send('Horario desagendado');
        }else{
            return res.status(404).send('Favor verificar as informações enviadas. Hora não agendada');
        }

    } catch (err) {

        res.status(500).json({message: 'Erro ao agendar horário ', error: err.message});
        
    }

}

module.exports = {
    getFreeData,
    getScheduledData,
    getAllDataScheduling,
    insertSchedulingData,
    unscheduleData,
    getMachedData,
    getScheduledDataByNameandDay
}