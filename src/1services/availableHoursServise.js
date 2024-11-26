const {client} = require('../0config/database');

async function getscheduledHour(PersonId, HourId) {
    try {
        const query = `select tat.hours_id from "PeDeByteSchema".tb_available_time tat where tat.member_id  = ($1) and tat.scheduled = true and tat.hours_id = ($2);`;

        const result = await client.query(query, [PersonId, HourId]);
        return result.rows[0].hours_id;
    } catch (err) {
        console.error(`Erro ao buscar horários agendados: ${err}`);
        throw err;
    }
}

async function getavailablehours(PersonId) {
    try {
        const query = `select * from "PeDeByteSchema".tb_available_time tat where tat.member_id  = ($1);`
        const result = await client.query(query, [PersonId]);
        console.log ('Resultado do SELECT: ', result.rows);
        return result.rows;
    } catch (err) {
        console.error(`Erro ao buscar horários disponíveis: ${err}`);
        throw err;
    }
}

async function insertAvailableHours (PersonId, HourId){
    try {
        const query = `insert into "PeDeByteSchema".tb_available_time (member_id , hours_id, scheduled) values ($1, $2, FALSE);`;
        await client.query(query, [PersonId, HourId]);
    } catch (err) {
        console.log(`Erro inserindo na tabela tb_avalilable_time: ${err}`)
    }
}

async function updateAvailableHours(PersonId, HourId){
    try {
        const query = `delete from "PeDeByteSchema".tb_available_time where tb_available_time.member_id = $1 and tb_available_time.hours_id = $2;`
        await client.query(query, [PersonId, HourId]);


    } catch (err) {
        
    }
}

async function deleteAvailableHours(PersonId, HourId) {
    try {
        const query = `delete from "PeDeByteSchema".tb_available_time where tb_available_time.member_id = $1 and tb_available_time.hours_id = $2;`
        await client.query(query, [PersonId, HourId]);
    } catch (err) {
        console.log(`Erro ao deletar o horário disponível: ${err}`)
    }
}

async function inativateAvailableHours(PersonId){
    try {
        const availableHoursInativateQuery = `update "PeDeByteSchema".tb_available_time tat set tat.scheduled  = TRUE where tat.member_id = ($1);`
        await client.query(availableHoursInativateQuery, [PersonId]);
    } catch (err) {
        console.log(`Erro inativando horario disponível ID ${PersonId}`);
        
    }
}

module.exports ={
    insertAvailableHours,
    inativateAvailableHours,
    getavailablehours,
    getscheduledHour,
    updateAvailableHours,
    deleteAvailableHours,
}