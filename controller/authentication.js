const express = require("express");
const jwt = require('jsonwebtoken');
const Router = express.Router();

Router.use(checkToken,(req,res,next) => {
	jwt.verify(req.token, 'Yuru_App', (err, authData)=>{
		if(err){
			console.log("Token doğru değil");
			res.sendStatus(403);
		}else{
			console.log("Token doğrulandı.Giriş başarılı");
			req.body.user = authData;
			console.log(req.body);
			next();
		}
	});
});


//Check Token
function checkToken(req,res,next){
	
	const token = req.headers["authorization"] || req.body.token || req.query.token;
	// Check if bearer is undefined
	if(typeof token == 'undefined'){
		console.log("Token bulunamadı.");
		res.sendStatus(403);
	}else{
		req.token = token;
		console.log("Token bulundu");
		next();
	}

};

//Product and Send Token
exports.sendToken = function (req,res,id){

	try{
		req.body.user.id = id;
		var token =  jwt.sign(req.body.user, 'Yuru_App' , { expiresIn: '30 days'} );//Token oluşturma
		res.json(token);//Başarılı
	}
	catch{
		console.log("Token gönderilemedi");
	}
	
};


exports.router = Router;