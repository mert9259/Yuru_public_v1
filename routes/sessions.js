const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const mysqlConnetion = require("../model/connection");
const authenticationConnection = require("../controller/authentication");


//User functions


Router.post("/signUp",(req,res)=>{
	//Veri parselleme
	const {name,email,password} = req.body.user;
	//Veri veritabanına kayıt
	bcrypt.hash(password, 10, function(err, hash) {
        mysqlConnetion.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",[name,email,hash],(err, rows, fields)=>{
			if(!err)
				res.json({"name":name});//Başarılı
			else	
				{
					console.log(err);//Başarısız Hata
					res.sendStatus(406);
				}
		});
    });//hash
	
});

Router.post("/signIn",(req,res,next)=>{
	//Veri parselleme
	const {email,password} = req.body.user;
	//Veri veritabanına kayıt
	mysqlConnetion.query("SELECT * FROM users WHERE email=?",email,(err, result, fields)=>{
		if(!err && result.length){
			bcrypt.compare(password, result[0].password, function(err, data) {
				if(data){
					//Token oluşturmak için parolayı yok et
					req.body.user.password = "";
					//Token göndermek için bağlantı kur authentication.js ile
					authenticationConnection.sendToken(req,res,result[0].id);
				}
				else{
					console.log("Parola yanlış veya kullanıcı adı yanlış");//Başarısız Hata
					res.sendStatus(403);
				}
			});//hash
		}
		else{
			if(!err){
				res.statusCode=403;
				res.send('E-mail adresi hatalı veya password hatalı.');
			}
			else{
				console.log(err);//Başarısız Hata
			}
			
		}
	});
	
	
});

module.exports = Router;