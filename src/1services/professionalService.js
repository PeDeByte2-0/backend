const { client } = require('../0config/database');


async function insertProfessional(memberId, speciality) {
    try {
        if (!speciality) {
            throw new Error("The 'speciality' parameter is required and cannot be null.");
        }

        const query = `
            INSERT INTO "PeDeByteSchema".tb_professional (member_id, speciality_id)
            VALUES ($1, $2);
        `;
        const values = [memberId, speciality];
        await client.query(query, values);
    } catch (err) {
        console.error(`Error inserting into tb_professional: ${err.message}`);
        throw err; // Re-throw the error to handle it at a higher level.
    }
}

module.exports = {insertProfessional}