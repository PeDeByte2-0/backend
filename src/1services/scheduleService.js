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

        if(result.rows.length === 0){
            console.log(`Não foi encontrado ninguém com ID ${PersonId}`);
            return[];
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro ao buscar os horários lives do id ${PersonId}, verificar erro: ${err}`);
        throw err;

    }

}

async function getMatchingProfessionalsByStudentId(studentId) {
    try {
        const query = `
           WITH student_availability AS (
                SELECT at.hours_id
                FROM "PeDeByteSchema".tb_available_time at
                JOIN "PeDeByteSchema".tb_student s ON at.member_id = s.member_id
                WHERE s.member_id = $1
            ),
            matching_professionals AS (
                SELECT 
                    p.member_id AS professional_id,
                    sp.name AS speciality_name,
                    h.*,
                    pd.first_name || ' ' || pd.last_name AS professional_name
                FROM "PeDeByteSchema".tb_professional p
                JOIN "PeDeByteSchema".tb_speciality sp ON p.speciality_id = sp.id_speciality
                JOIN "PeDeByteSchema".tb_available_time at ON at.member_id = p.member_id
                JOIN student_availability sa ON sa.hours_id = at.hours_id
                JOIN "PeDeByteSchema".tb_necessity n ON n.speciality_id = sp.id_speciality AND n.student_id = $1
                JOIN "PeDeByteSchema".tb_hours h ON h.id_hours = at.hours_id
                JOIN "PeDeByteSchema".tb_person_data pd ON pd.person_id = p.member_id
                JOIN "PeDeByteSchema".tb_person ps ON ps.id_person = p.member_id
                WHERE ps.active = true  -- Filtra apenas profissionais ativos
            )
            SELECT DISTINCT professional_id, professional_name, speciality_name, id_hours, weekday, starttime, endtime
            FROM matching_professionals;
        `;

        const result = await client.query(query, [studentId]);

        if (result.rows.length === 0) {
            console.log(`Não foi encontrado nenhum profissional disponível para o aluno com ID ${studentId}`);
            return [];
        } else {
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows;
        }

    } catch (err) {
        console.error(`Erro ao buscar profissionais para o aluno com ID ${studentId}, erro: ${err}`);
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

        if(result.rows.length === 0){
            console.log(`Não foi encontrado ninguém com ID ${PersonId}`);
            return[];
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro realizando a busca para a ID ${PersonId}, verificar erro: ${err}`);
        throw err;

    }
    
}

async function getMatchedHours(StudentId, ProfessionalId) {

    try {
        
        const query = `SELECT  
                        th.id_hours,
                        th.weekday,
                        th.starttime,
                        th.endtime 
                    FROM "PeDeByteSchema".tb_hours th 
                    JOIN "PeDeByteSchema".tb_available_time tat_student 
                        ON th.id_hours = tat_student.hours_id
                    JOIN "PeDeByteSchema".tb_available_time tat_professional 
                        ON th.id_hours = tat_professional.hours_id
                    WHERE 
                        tat_professional.member_id = $1 
                        AND tat_student.member_id = $2 
                        AND tat_student.scheduled = false 
                        AND tat_professional.scheduled = false;`;
        const result = await client.query(query, [ProfessionalId, StudentId]);

        if(result.rows.length === 0){
            console.log(`Não foi encontrado ninguém com ID ${PersonId}`);
            return[];
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {

        console.error(`Erro realizando a busca de horarios compativeis para agendamento, verificar erro: ${err}`);
        throw err;
        
    }
    
}

async function getAllScheduling() {
    
    try {
        
        const query = ` SELECT  
                        ts.id_scheduled,
                        ts.student_id,
                        tpd_student.first_name AS student_name,
                        tpd_student.last_name AS student_surname,
                        ts.professional_id,
                        tpd_professional.first_name AS professional_name,
                        tpd_professional.last_name AS professional_surname,
                        ts2.name AS speciality,
                        ts.hours_id,
                        th.weekday,
                        th.starttime AS start_time,
                        th.endtime AS end_time,
                        ts.scheduled
                    FROM "PeDeByteSchema".tb_scheduled ts
                    JOIN "PeDeByteSchema".tb_hours th 
                        ON ts.hours_id = th.id_hours
                    JOIN "PeDeByteSchema".tb_person_data tpd_student 
                        ON tpd_student.person_id = ts.student_id
                    JOIN "PeDeByteSchema".tb_person_data tpd_professional 
                        ON tpd_professional.person_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_professional tp
                        ON tp.member_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_speciality ts2
                        ON tp.speciality_id = ts2.id_speciality
                    WHERE ts.scheduled = true
                    AND EXISTS (
                        SELECT 1
                        FROM "PeDeByteSchema".tb_person ts3
                        WHERE ts3.id_person IN (ts.student_id, ts.professional_id) 
                            AND ts3.active = TRUE
                    );`;

        const result = await client.query(query);
        
        if(result.rows.length === 0){
            console.log(`Não foi encontrado nenhum horário agendado`);
            return[];
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro ao buscar todos os agendamentos, avalie o erro ${err}`);
        throw err;

    }

}

async function getSchedulingByPersonNameandweekday(PersonName, WeekDayId){

    try {

        const query = `SELECT  
                        ts.id_scheduled,
                        ts.student_id,
                        tpd_student.first_name AS student_name,
                        tpd_student.last_name AS student_surname,
                        ts.professional_id,
                        tpd_professional.first_name AS professional_name,
                        tpd_professional.last_name AS professional_surname,
                        ts2.name AS speciality,
                        ts.hours_id,
                        th.weekday,
                        th.starttime AS start_time,
                        th.endtime AS end_time,
                        ts.scheduled
                    FROM "PeDeByteSchema".tb_scheduled ts
                    JOIN "PeDeByteSchema".tb_hours th 
                        ON ts.hours_id = th.id_hours
                    JOIN "PeDeByteSchema".tb_person_data tpd_student 
                        ON tpd_student.person_id = ts.student_id
                    JOIN "PeDeByteSchema".tb_person_data tpd_professional 
                        ON tpd_professional.person_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_professional tp
                        ON tp.member_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_speciality ts2
                        ON tp.speciality_id = ts2.id_speciality
                    WHERE ts.scheduled = TRUE
                    AND (
                        lower(tpd_student.first_name) LIKE $1 
                        OR lower(tpd_student.last_name) LIKE $2
                        OR lower(tpd_professional.first_name) LIKE $3 
                        OR lower(tpd_professional.last_name) LIKE $4
                    )
                    AND th.weekday LIKE $5
                    AND EXISTS (
                        SELECT 1
                        FROM "PeDeByteSchema".tb_person ts3
                        WHERE ts3.active = TRUE
                    );`;

        const result = await client.query(query, [`%${PersonName}%`, `%${PersonName}%`, `%${PersonName}%`, `%${PersonName}%`, `${WeekDayId}`]);

        console.log ('Resultado do SELECT: ', result.rows);

        return result.rows;

    } catch (err) {
        
        console.error(`Erro ao buscar o agendamento pelo nome ${PersonName} e pela data ${WeekDayId}: ${err}`);
        throw err;

    }

}

async function getSchedulingByPersonName(PersonName){

    try {

        const query = `SELECT  
                        ts.id_scheduled,
                        ts.student_id,
                        tpd_student.first_name AS student_name,
                        tpd_student.last_name AS student_surname,
                        ts.professional_id,
                        tpd_professional.first_name AS professional_name,
                        tpd_professional.last_name AS professional_surname,
                        ts2.name AS speciality,
                        ts.hours_id,
                        th.weekday,
                        th.starttime AS start_time,
                        th.endtime AS end_time,
                        ts.scheduled
                    FROM "PeDeByteSchema".tb_scheduled ts
                    JOIN "PeDeByteSchema".tb_hours th 
                        ON ts.hours_id = th.id_hours
                    JOIN "PeDeByteSchema".tb_person_data tpd_student 
                        ON tpd_student.person_id = ts.student_id
                    JOIN "PeDeByteSchema".tb_person_data tpd_professional 
                        ON tpd_professional.person_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_professional tp
                        ON tp.member_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_speciality ts2
                        ON tp.speciality_id = ts2.id_speciality
                    WHERE ts.scheduled = TRUE
                    AND (
                        lower(tpd_student.first_name) LIKE $1 
                        OR lower(tpd_student.last_name) LIKE $2
                        OR lower(tpd_professional.first_name) LIKE $3 
                        OR lower(tpd_professional.last_name) LIKE $4
                    )
                    AND EXISTS (
                        SELECT 1
                        FROM "PeDeByteSchema".tb_person ts3
                        WHERE ts3.active = TRUE
                    );`;

        const result = await client.query(query, [`%${PersonName}%`, `%${PersonName}%`, `%${PersonName}%`, `%${PersonName}%`]);

        console.log ('Resultado do SELECT: ', result.rows);

        return result.rows;

    } catch (err) {
        
        console.error(`Erro ao buscar o agendamento pelo nome ${PersonName} e pela data ${WeekDayId}: ${err}`);
        throw err;

    }

}


async function getSchedulingByPersonId(PersonId) {
    
    try {
        
        const query = ` SELECT  
                        ts.id_scheduled,
                        ts.student_id,
                        tpd_student.first_name AS student_name,
                        tpd_student.last_name AS student_surname,
                        ts.professional_id,
                        tpd_professional.first_name AS professional_name,
                        tpd_professional.last_name AS professional_surname,
                        ts2.name AS speciality,
                        ts.hours_id,
                        th.weekday,
                        th.starttime AS start_time,
                        th.endtime AS end_time,
                        ts.scheduled
                    FROM "PeDeByteSchema".tb_scheduled ts
                    JOIN "PeDeByteSchema".tb_hours th 
                        ON ts.hours_id = th.id_hours
                    JOIN "PeDeByteSchema".tb_person_data tpd_student 
                        ON tpd_student.person_id = ts.student_id
                    JOIN "PeDeByteSchema".tb_person_data tpd_professional 
                        ON tpd_professional.person_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_professional tp
                        ON tp.member_id = ts.professional_id
                    JOIN "PeDeByteSchema".tb_speciality ts2
                        ON tp.speciality_id = ts2.id_speciality
                    WHERE ts.scheduled = true
                    AND EXISTS (
                        SELECT 1
                        FROM "PeDeByteSchema".tb_person ts3
                        WHERE ts3.id_person = $1 
                            AND ts3.active = TRUE
                    );`;

        const result = await client.query(query, [PersonId]);
        
        if(result.rows.length === 0){
            console.log(`Não foi encontrado nenhum horário agendado`);
            return[];
        }else{
            console.log(`Resultados do SELECT: `, result.rows);
            return result.rows
        }

    } catch (err) {
        
        console.error(`Erro ao buscar todos os agendamentos, avalie o erro ${err}`);
        throw err;

    }

}

async function scheduleHour(PersonId, HoursId) {
    
    try {
        
        await client.query('BEGIN;');

        const query = `update "PeDeByteSchema".tb_available_time set scheduled = true where member_id = $1 and hours_id = $2 returning *;`;
        const result = await client.query(query, [PersonId, HoursId]);
        await client.query('COMMIT;');

        console.log(`Resultado da atualização: ${result.rows}`);

        return result.rows

    } catch (err) {
       
        await client.query('ROLLBACK;');
        console.error(`Erro atualizando hora para agendada ${err}`);
        throw err;
    }

}

async function unscheduleHour(PersonId, HoursId) {

    try {
        
        await client.query('BEGIN;');

        const query = `update "PeDeByteSchema".tb_available_time set scheduled = false where member_id = $1 and hours_id = $2 returning *;`;
        const result = await client.query(query, [PersonId, HoursId]);
        await client.query('COMMIT;');

        console.log(`Resultado da atualização: ${result.rows}`);

        return result.rows

    } catch (err) {
       
        await client.query('ROLLBACK;');
        console.error(`Erro atualizando hora para agendada ${err}`);
        throw err;
    }
    
}

async function insertSchedulingHour(StudentId, ProfessionalId, HoursId,Observacao) {
    
    try {
        
        await client.query('BEGIN;');

        const query = ` insert into "PeDeByteSchema".tb_scheduled(student_id, professional_id, hours_id, scheduled, observacao) values($1, $2, $3, TRUE,$4) returning *;`;
        const result = await client.query(query, [StudentId, ProfessionalId, HoursId,Observacao]);
        await scheduleHour(StudentId, HoursId);
        await scheduleHour(ProfessionalId, HoursId);

        await client.query('COMMIT;');
        console.log(`Hora agendada com sucesso;`)

        return result.rows[0];

    } catch (err) {

        await client.query('ROLLBACK;')
        console.error(`Erro agendando horário: ${err}`);
        throw err;

    }
    
}

async function unschedule(StudentId, ProfessionalId, HoursId) {

    try {
        
        await client.query(`BEGIN;`);

        const query = ` UPDATE "PeDeByteSchema".tb_scheduled 
	                        set scheduled = false 
                        where student_id = $1 and professional_id = $2 and hours_id = $3 returning *;`
        const result = await client.query(query, [StudentId, ProfessionalId, HoursId]);

        await unscheduleHour(StudentId, HoursId);
        await unscheduleHour(ProfessionalId, HoursId);

        await client.query('COMMIT;');

        return result.rows[0];

    } catch (err) {
        
        await client.query('ROLLBACK;')
        console.error(`Erro agendando horário: ${err}`);
        throw err;

    }
    
}

// async function createteste(){
//     try {
//         const query = `drop table "PeDeByteSchema".tb_scheduled ;

// CREATE TABLE "PeDeByteSchema".tb_scheduled (
//     id_scheduled SERIAL PRIMARY KEY,
//     student_id INT NOT NULL,
//     professional_id INT NOT NULL,
//     hours_id INT NOT NULL,
//     scheduled BOOLEAN not null,
//     observacao text,
//     CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES "PeDeByteSchema".tb_student(member_id),
//     CONSTRAINT fk_professional FOREIGN KEY (professional_id) REFERENCES "PeDeByteSchema".tb_professional(member_id),
//     CONSTRAINT fk_hours FOREIGN KEY (hours_id) REFERENCES "PeDeByteSchema".tb_hours(id_hours)
// );`;
// const response = await client.query(query);
// console.log(`Criado a tabela: scheduled: ${response}`)
//     } catch (err) {
        
//     }
// }

module.exports = {
    getFreeTimeById,
    getScheduledTimeById,
    getAllScheduling,
    getSchedulingByPersonId,
    getMatchedHours,
    insertSchedulingHour,
    unschedule,
    getSchedulingByPersonNameandweekday,
    getSchedulingByPersonName,
    getMatchingProfessionalsByStudentId,

}
