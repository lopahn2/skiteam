const express = require('express');
const router = express.Router();
const path = require('path')
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

router.get('/', async (req, res) => {
    try {
        return res.sendFile(path.join(__dirname, '../views/home.html'));
    } catch (e) {
        console.error(e)
    }
    
});

router.get('/complete', async (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/complete.html'))
});

router.post('/', async (req, res) => {
    try {
        const body = req.body
        console.log(body);
        await conn.execute('INSERT INTO application VALUES (?,?,?,?,?,?)', [null, body.name, body.college, body.department, body.student_number, body.phone_number]);
        return res.redirect('/home/complete');
    } catch (e) {
        console.error(e);
        return res.status(400).json("DB CONFLICT 발생. CONSOLE 확인");
    }
    
});



const notAllowedMsg = {
	error : "Method Not Allowed", 
	message: "허가되지 않은 메소드입니다."
}

router.route('/')
    .delete(async (req, res) => {
        return res.status(405).json(notAllowedMsg);
    })
    


module.exports = router;

