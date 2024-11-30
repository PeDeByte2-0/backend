const {client} = require('../0config/database');

async function getFreeTimeById(PersonId){
    
    try {

        const query = ` select  tat.member_id,
                            tpd.first_name,
                            tpd.last_name,
                            th.id_hours, 
                            th.weekday,
                            th.starttime,
                            th.endtime
                    from "PeDeByteSchema".tb_available_time tat 
                    join "PeDeByteSchema".tb_hours th on
                        tat.hours_id = th.id_hours 
                    join "PeDeByteSchema".tb_person_data tpd on
                        tat.member_id = tpd.person_id
                    join "PeDeByteSchema".tb_person tp on
                        tat.member_id = tp.id_person
                    where 
                        tat.scheduled = false and 
                        tat.member_id = $1 and
                        tp.active = TRUE;`;
        const result = await client.query(query, [PersonId]);

        if(result.rows === 0){
            console.log(`Não foi encontrado ninguém com ID ${PersonId}`);
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro ao buscar os horários lives do id ${PersonId}, verificar erro: ${err}`);
        throw err;

    }

}

async function getScheduledTimeById(PersonId){
    
    try {
     
        const query = ` select  tat.member_id,
                                tpd.first_name,
                                tpd.last_name,
                                th.id_hours, 
                                th.weekday,
                                th.starttime,
                                th.endtime
                        from "PeDeByteSchema".tb_available_time tat 
                        join "PeDeByteSchema".tb_hours th on
                            tat.hours_id = th.id_hours 
                        join "PeDeByteSchema".tb_person_data tpd on
                            tat.member_id = tpd.person_id
                        join "PeDeByteSchema".tb_person tp on
                            tat.member_id = tp.id_person
                        where 
                            tat.scheduled = TRUE and 
                            tat.member_id = $1 and
                            tp.active = TRUE;`;
        
        const result = await client.query(query, [PersonId]);

        if(result.rows === 0){
            console.log(`Não foi encontrado ninguém com ID ${PersonId}`);
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro realizando a busca para a ID ${PersonId}, verificar erro: ${err}`);
        throw err;

    }
    
}

async function scheduleHour(PersonId) {
    
    try {
        
        await client.query('BEGIN;');

        const query = `update "PeDeByteSchema".tb_available_time set scheduled = true where member_id = $1;`;
        const result = await client.query(query, [PersonId]);
        await client.query('COMMIT;');

        console.log(`Resultado da atualização: ${result.rows}`);

    } catch (err) {
       
        await client.query('ROLLBACK;');
        console.error(`Erro atualizando hora para agendada ${err}`);
        throw err;
    }

}

module.exports = {
    getFreeTimeById,
    getScheduledTimeById,
}
