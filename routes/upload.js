const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/accessController.js');
const moment = require('moment-timezone');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
moment.tz.setDefault('Asia/Seoul');

try {
    fs.readdirSync('../public/images');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('../public/images');
}

const upload = multer({
    // 파일 저장 위치 (disk , memory 선택)
    storage: multer.diskStorage({
        destination: function (req, file, done) {
            done(null, '../public/images');
        },
        filename: function (req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
});

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);


router.post('/', verifyToken, async (req, res) => {
	
	try {
		return res.status(201).json({
			message : "스터디 그룹이 성공적으로 생성됐습니다.",
            roomId,
            roomPwdResult : pwdFlag
		});
	} catch (err) {
		return res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "올바르지 않은 스터디 그룹 정보입니다."
			}
		);
	}
});


const notAllowedMsg = {
	error : "Method Not Allowed", 
	message: "허가되지 않은 메소드입니다."
}

// router.route('/')
// 	.delete(async (req, res) => {
// 		return res.status(405).json(notAllowedMsg);
// 	})
// 	.put(async (req, res) => {
// 		return res.status(405).json(notAllowedMsg);
// 	})


module.exports = router;

