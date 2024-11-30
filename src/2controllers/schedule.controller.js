const {getFreeTimeById, getScheduledTimeById} = require('../1services/scheduleService');

async function getFreeData(req, res) {
    
    try {

        const PersonId = req.params.id

        const data = await getFreeTimeById(PersonId);
        res.json(data);

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

async function getScheduledData(req, res) {
    
    try {
        
        const PersonId = req.params.id;

        const data = await getScheduledTimeById(PersonId);
        res.json(data)

    } catch (err) {
        
        console.log(`Erro: ${err}`);
        res.status(500).send('Erro ao buscar dados controller');

    }

}

module.exports = {
    getFreeData,
    getScheduledData,
}