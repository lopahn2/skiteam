const express = require('express');
const router = express.Router();
const path = require('path')
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

router.get('/', async (req, res) => {
    try {
        const [applicationResult, applicationField] = await conn.execute('SELECT * FROM application');
        return res.status(200).json(
            {
                applicationResult
            }
        )
    } catch (e) {
        console.error(e)
    }
    
});


router.get('/dashboard', async (req, res) => {
    try {
        return res.sendFile(path.join(__dirname, '../views/admin.html'));
    } catch (e) {
        console.error(e)
    }
    
});


module.exports = router;

