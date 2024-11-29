const {client} = require('../0config/database');

async function getscheduledHour(PersonId, HourId) {
    try {
        const query = `select tat.hours_id from "PeDeByteSchema".tb_available_time tat where tat.member_id  = ($1) and tat.scheduled = true and tat.hours_id = ($2);`;

        const result = await client.query(query, [PersonId, HourId]);
        if(result.rows.length > 0){
            return result.rows[0].id_hours;
        } else {
            console.log('Nenhum horário agendado encontrado.');
            return null; 
        }
    } catch (err) {
        console.error(`Erro ao buscar horários agendados: ${err}`);
        throw err;
    }
}

async function getavailablehours(PersonId) {
    try {
        const query = `select   tat.member_id,
                                th.*,
                                tat.scheduled 
                        from "PeDeByteSchema".tb_available_time tat
                        join "PeDeByteSchema".tb_hours th on
                            tat.hours_id = th.id_hours 
                        where tat.member_id  = ($1);`
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
    
        await client.query('BEGIN;');

        const query = `insert into "PeDeByteSchema".tb_available_time (member_id , hours_id, scheduled) values ($1, $2, FALSE);`;
        await client.query(query, [PersonId, HourId]);

        await client.query('COMMIT');

    } catch (err) {

        await client.query('ROLLBACK');
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

        await client.query('BEGIN;');

        const query = `delete from "PeDeByteSchema".tb_available_time where tb_available_time.member_id = $1 and tb_available_time.hours_id = $2;`
        await client.query(query, [PersonId, HourId]);

        await client.query('COMMIT');

    } catch (err) {

        await client.query('ROLLBACK');
        console.log(`Erro ao deletar o horário disponível: ${err}`)

    }

}

async function inativateAvailableHours(PersonId){

    try {

        await client.query('BEGIN;'); 
        const availableHoursInativateQuery = `update "PeDeByteSchema".tb_available_time tat set scheduled = TRUE where member_id = $1;`
        await client.query(availableHoursInativateQuery, [PersonId]);
        await client.query('COMMIT');

    } catch (err) {

        await client.query('ROLLBACK');
        console.log(`Erro inativando horario disponível ID ${PersonId}: ${err}`);
        
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