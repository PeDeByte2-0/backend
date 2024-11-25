const {client} = require('../0config/database');
const { createMember } = require('./memberService');
const { createPersonData } = require('./personDataService');
const { createPerson } = require('./personService');

async function getAllStudents() {
    try {
        const query = 'select tp.id_person, tp.active, tpd.first_name,tpd.last_name,tpd.cpf,tpd.celular from "PeDeByteSchema".tb_person tp join "PeDeByteSchema".tb_person_data tpd on tp.id_person = tpd.tb_person_id_person join "PeDeByteSchema".tb_member tm on tp.id_person = tm.tb_person_id_person join "PeDeByteSchema".tb_student ts on tp.id_person = ts.tb_member_tb_person_id_person where tp.active = true;';
        const result = await client.query(query);

        console.log ('Resultado do SELECT: ', result.rows);
        return result.rows;
    } catch (err) {
        console.error(`Erro ao buscar todos os estudantes: ${err}`);
        throw err;
    }
}

async function getavailablestudenthours(id) {
    try {
        const query = `select * from "PeDeByteSchema".tb_available_time tat where "Member_tb_person_id_person" = ($1)`
        const result = await client.query(query, [id]);
        console.log ('Resultado do SELECT: ', result.rows);
        return result.rows;
    } catch (err) {
        console.error(`Erro ao buscar horários disponíveis do estudante: ${err}`);
        throw err;
    }
}

async function getSpecialityFromStudent(id){
    try {
        const query = 'select ts.idtb_speciality, ts."name"  from "PeDeByteSchema".tb_speciality ts join "PeDeByteSchema".tb_necessity tn on ts.idtb_speciality = tn.tb_speciality_idtb_speciality where tn.tb_member_tb_person_id_person = $1;';
        const values = [id];
        const result = await client.query(query, values);

        console.log("Registro de escpecialidades dos alunos: ", result.rows);
        return result.rows;
    } catch (err) {
        console.error(`Erro ao buscar as especialidades do aluno ${id}: ${err}`);
        throw err;
    }
}

async function createStudent(idSchool, firstName, lastName, cpf, celular, obs, idAvalilablehours, specialits) {
    try {
        // Inicia a transação
        await client.query('BEGIN');


        const personId = await createPerson(idSchool);
        await createPersonData (personId, firstName, lastName, cpf, celular);
        await createMember (personId, obs)

        const studentQuery = `insert into "PeDeByteSchema".tb_student (tb_member_tb_person_id_person) values ($1);`
        await client.query(studentQuery, [personId]);

        for (const hour of idAvalilablehours){
            const availableHoursQuery = `insert into "PeDeByteSchema".tb_available_time (Member_tb_person_id_person, tb_hours_id_hours) values ($1, $2);`;

            await client.query(availableHoursQuery, [personId, hour]);
        }

        for (const necessity of specialits){
            const necessityQuery = `insert into "PeDeByteSchema".tb_necessity (tb_member_tb_person_id_person, tb_speciality_idtb_speciality) values ($1, $2);`;
            await client.query(necessityQuery, [personId, necessity]) ;
        }

        // Finaliza a transação
        await client.query('COMMIT');

        console.log('Novo aluno inserido com ID: ', personId);
        return { id: personId };
    } catch (err) {
        // Reverte a transação em caso de erro
        await client.query('ROLLBACK');
        console.error('Erro ao criar o aluno: ', err);
        throw err;
    }
}

async function inativateStudent(id) {
    
    try {
        await client.query('BEGIN');    

        const personInativateQuery = `update "PeDeByteSchema".tb_person tp set active = false where tp.id_person = ($1);`
        await client.query(personInativateQuery, [id]);
        
        const availableHoursInativateQuery = `update "PeDeByteSchema".tb_available_time tat set "Scheduled" = true where tat."Member_tb_person_id_person" = ($1);`
        await client.query(availableHoursInativateQuery, [id]);

        await client.query('COMMIT');
        console.log(`Estudante com ID ${id} inativado com sucesso.`);        
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao inativar estudante:', err);
        throw err;
    }
}
module.exports = {
    getAllStudents,
    getavailablestudenthours,
    getSpecialityFromStudent,
    createStudent,
    inativateStudent
}