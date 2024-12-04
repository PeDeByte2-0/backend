const {client} = require('../0config/database');
const { createPerson, inativatePerson, updatePerson } = require('./personService');
const { createMember, updateMember } = require('./memberService');
const { createPersonDataProfessional, updatePersonDataProfessional } = require('./personDataService');
const { createProfessional, updateProfessional } = require('./professionalService')
const { insertAvailableHours, inativateAvailableHours, getscheduledHour, deleteAvailableHours } = require('./availableHoursServise');

async function getAllProfessionals(){

    try {

        const query = ` select  tp.id_person, 
                                tp.active, 
                                tpd.first_name,
                                tpd.last_name,
                                tpd.cpf,tpd.celular,
                                ts."name" as speciality
                        from "PeDeByteSchema".tb_person tp 
                        join "PeDeByteSchema".tb_person_data tpd on 
                            tp.id_person = tpd.person_id 
                        join "PeDeByteSchema".tb_member tm on 
                            tp.id_person = tm.person_id 
                        join "PeDeByteSchema".tb_professional tp2 on
                            tp.id_person = tp2.member_id 
                        join "PeDeByteSchema".tb_speciality ts on
                            tp2.speciality_id = ts.id_speciality 
                        where tp.active = true;`;
        const result = await client.query(query);

        console.log(`Resultado do SELECT: `, result.rows);

        return result.rows;

    } catch (err) {

        console.error(`Erro ao buscar todos os profissionais: ${err}`);
        throw err;

    }
}

async function getProfessionalById(PersonId){

    try {

        console.log(`Id Informada ${PersonId}`);
        const query = `select  tp.id_person, 
		tp.active, 
		tpd.first_name,
		tpd.last_name,
		tpd.cpf,tpd.celular,
		ts."name" as speciality
from "PeDeByteSchema".tb_person tp 
join "PeDeByteSchema".tb_person_data tpd on 
	tp.id_person = tpd.person_id 
join "PeDeByteSchema".tb_member tm on 
	tp.id_person = tm.person_id 
join "PeDeByteSchema".tb_professional tp2 on
	tp.id_person = tp2.member_id 
join "PeDeByteSchema".tb_speciality ts on
	tp2.speciality_id = ts.id_speciality 
where   tp.active = true and 
		tp.id_person = $1;`;
        const result = await client.query(query, [PersonId]);
        
        console.log ('Resultado do SELECT: ', result.rows);

        return result.rows[0]; 

    } catch (err) {

        concole.error(`Erro ao buscar o professor ID ${PersonId}: ${err}`);
        throw err;

    }
}

async function createProfessionals(idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId){

    try {
        
        await client.query("BEGIN");

        const PersonId = await createPerson(idSchool);
        await createPersonDataProfessional(PersonId, firstName, lastName, cpf, celular);
        await createMember(PersonId, obs);
        await createProfessional(PersonId, specialityId);

        for (const hour of AvailableHoursId){
            await insertAvailableHours(PersonId, hour);
        }

        await client.query("COMMIT");
        
        console.log(`Novo Profissional inserido com ID: ${PersonId}`);
        return { id: PersonId };

    } catch (err) {

        await client.query('ROLLBACK');
        console.error(`Erro ao criar profissional: ${err}`);
        throw err;

    }

}

async function updateProdessionals(PersonId, idSchool, firstName, lastName, cpf, celular, obs, specialityId, AvailableHoursId){

    try {

        await client.query('BEGIN');

        updatePerson(PersonId, idSchool),
        updatePersonDataProfessional(PersonId, firstName, lastName, cpf, celular);
        
        for(const hours of AvailableHoursId){
            if (hours !== getscheduledHour(PersonId, hours)){
                deleteAvailableHours(PersonId, hours);
            }else{
                throw new Error(`Hora ${hours} já está agendada para o ID ${PersonId}. Operação interrompida.`);
            }
        }
        for(const hours of AvailableHoursId){
            insertAvailableHours(PersonId, hours);
        }

        updateProfessional(PersonId, specialityId);
        updateMember(PersonId, obs);

        await client.query('COMMIT');
        return { id: PersonId };

    } catch (err) {

        client.query('ROLLBACK');
        console.error(`Erro ao atualizar o profissional ${PersonId}: ${err}`);
        throw err;

    }

}

async function inativateProfessional(PersonId) {
    
    try {
        
        await client.query('BEGIN');

        const result = inativatePerson(PersonId);
        inativateAvailableHours(PersonId);

        await client.query('COMMIT');
        console.log(`Profissional com ID ${PersonId} inativado com sucesso`);
        return result;

    } catch (err) {
        
        await client.query('ROLLBACK');
        console.error(`Erro inativando estudante: ${err}`);
        throw err;

    }

}

module.exports = {
    getAllProfessionals,
    getProfessionalById,
    createProfessionals,
    updateProdessionals,
    inativateProfessional
}