
const {client} = require('../0config/database');

async function createProfessional(PersonId, SpecialityId){
    try {
        
        await client.query('BEGIN');

        console.log(`ID do profissional: ${PersonId}, ID da especialidade: ${SpecialityId}`);
        const query = `insert into "PeDeByteSchema".tb_professional (member_id, speciality_id)
values ($1, $2);`;
    const result = await client.query(query, [PersonId, SpecialityId]);

        await client.query('COMMIT');
        return result.rows[0];

    } catch (err) {

        await client.query('ROLLBACK');
        console.log(`Erro inserindo na tabela tb_profesisonal: ${err}`);
        throw err;

    }
}

async function updateProfessional(PersonId, SpecialityId){
    try {
        
        await client.query('BEGIN');

        const query = `update "PeDeByteSchema".tb_professional set speciality_id = $1 where member_id = $2;`
        const result = await client.query(query, [SpecialityId, PersonId]);
        
        await client.query('COMMIT');
        return result.rows[0];

    } catch (err) {
        
        await client.query('ROLLBACK');
        console.log(`Erro atualizando a tabela tb_professional: ${err}`);
        throw err;
        
    }
} 

module.exports = {
    createProfessional,
    updateProfessional,
}

