const {client} = require('../0config/database');

async function insertStudent(memberId){
    try {
        const query = `insert into "PeDeByteSchema".tb_student (member_id) values ($1);`
        await client.query(query, [memberId]);
    } catch (err) {
        console.log(`Erro inserindo na tabela tb_student${err}`);
    }
}

module.exports = {
    insertStudent
}