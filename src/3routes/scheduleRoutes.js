const express = require('express');
const {getFreeData, getScheduledData} = require('../2controllers/schedule.controller');
const router = express.Router();

router.get('/scheduledTime/:id', (req, res, next) => {
    
    console.log('Requisição recebida em /scheduledTime/:id');
    getScheduledData(req, res, next);

});

router.get('/freeTime/:id', (req, res, next) => {

    console.log('Requisição recebida em freeTime/:id');
    getFreeData(req, res, next);
});

module.exports = router;