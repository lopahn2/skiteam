const jwt = require('jsonwebtoken');

let redisLocalCon = "";
require('../db/redisLocalCon.js')().then((res) => redisLocalCon = res);
exports.verifyToken = async (req, res, next) => {
	try {
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		const DBSearchResult = await redisLocalCon.get(req.decoded.id);
		if (DBSearchResult !== null) {
			return next();	
		} else {
			throw new Error('TokenExpiredError');
		}
		
	} catch (err) {
		if (err.name == "TokenExpiredError") {
			return res.status(403).json({
					error : '403 Forbidden',
					message: '토큰이 만료됐습니다.'
				});
		}
		return res.status(403).json({
					error : '403 Forbidden',
					message: '유효하지 않은 토큰입니다.'
				});
	}
}

exports.pwdChangeAllowingCheck = async (req, res, next) => {
	try {
		const jwtToken = req.headers.authorization.split(' ')[1]
		req.decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
		
		if (req.decoded.allowResult) {
			return next();	
		} else {
			throw new Error('TokenExpiredError');
		}
		
	} catch (err) {
		if (err.name == "TokenExpiredError") {
			return res.status(403).json({
					error : '403 Forbidden',
					message: '토큰이 만료됐습니다.'
				});
		}
		return res.status(403).json({
					error : '403 Forbidden',
					message: '유효하지 않은 토큰입니다.'
				});
	}
}