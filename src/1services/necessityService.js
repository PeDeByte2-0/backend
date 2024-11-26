const {client} = require('../0config/database');

async function getSpecialityFromStudent(id){
    try {
        const query = 'select ts.id_speciality, ts."name", tn.active  from "PeDeByteSchema".tb_speciality ts join "PeDeByteSchema".tb_necessity tn on ts.id_speciality = tn.speciality_id where tn.student_id = $1;';
        const result = await client.query(query, [id]);

        console.log("Registro de escpecialidades dos alunos: ", result.rows);
        return result.rows;
    } catch (err) {
        console.error(`Erro ao buscar as especialidades do aluno ${id}: ${err}`);
        throw err;
    }
}

async function insertNecessity(personId, specialityId){
    try {
        const query = `insert into "PeDeByteSchema".tb_necessity (student_id , speciality_id, active) values ($1, $2, 'TRUE');`;
        await client.query(query,[ personId, specialityId]);
    } catch (err) {
        console.log(`Erro inserindo na tabela tb_necessity ${err}`);
    }
}

async function deleteNecessityByID(PersonId){
    try {
        const query = `delete from "PeDeByteSchema".tb_necessity where tb_necessity.student_id = $1;`;
        await client.query(query, [PersonId])
    } catch (err) {
        console.log(`Erro deletando na tabela tb_necessity ${err}`);
    }
}

module.exports = {
    getSpecialityFromStudent,
    insertNecessity,
    deleteNecessityByID
}