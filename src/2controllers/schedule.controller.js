const {getFreeTimeById,getMatchingProfessionalsByStudentId, getScheduledTimeById, getAllScheduling, insertSchedulingHour, unschedule, getMatchedHours, getSchedulingByPersonName, getSchedulingByPersonNameandweekday} = require('../1services/scheduleService');
function hoursConverter(hours) {
    return hours.map(e => ({
      ...e, // Copia as propriedades originais
      weekday: e.weekday === "0" ? 'Segunda-feira' :
               e.weekday === "1" ? 'Terça-feira' :
               e.weekday === '2' ? 'Quarta-feira' :
               e.weekday === '3' ? 'Quinta-feira' :
               e.weekday === '4' ? 'Sexta-feira' :
               e.weekday === "5" ? 'Sábado' :
               'Domingo'
    }));
  }

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

async function getMatchingProfessionalData(req, res) {
    try {
        const studentId = req.params.id;  // Pega o ID do aluno da URL
        console.log('getMatchingProfessionalData' + studentId);
        
        // Chama a função que retorna os profissionais correspondentes ao aluno
        const data = await getMatchingProfessionalsByStudentId(studentId);
        // Retorna os dados em formato JSON
        res.json(data);
        
    } catch (err) {
        // Em caso de erro, loga o erro e retorna uma mensagem
        console.error('Erro ao buscar consulta', err);
        res.status(500).send('Erro ao buscar dados no controller');
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
        newdata = hoursConverter(data);
        res.json(newdata);

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}
async function insertSchedulingData(req, res) {
    try {
        const { StudentId, HoursData, Observacao } = req.body;

        // Para cada item de HoursData, insira no banco
        for (const hour of HoursData) {
            const { id_hours, id_professional } = hour;

            // Aqui você pode chamar a função para inserir no banco
            const result = await insertSchedulingHour(StudentId, id_professional, id_hours, Observacao);

            if (!result) {
                return res.status(404).send('Erro ao agendar horário');
            }
        }

        return res.status(200).send('Horário(s) agendado(s) com sucesso');
    } catch (err) {
        console.error('Erro ao agendar horário:', err);
        return res.status(500).json({ message: 'Erro ao agendar horário', error: err.message });
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
    getScheduledDataByNameandDay,
    getMatchingProfessionalData
}