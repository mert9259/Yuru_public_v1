const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const mysqlConnetion = require("../model/connection");


//User functions


Router.post("/signUp",(req,res)=>{
	//Veri parselleme
	const {name,email,password} = req.body;
	//Veri veritabanına kayıt
    bcrypt.hash(password, 10, function(err, hash) {
        mysqlConnetion.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",[name,email,hash],(err, rows, fields)=>{
			if(!err)
				res.send(name+" kişisinin kayıt işlemi gerçekleştirilmiştir.");//Başarılı
			else	
				console.log(err);//Başarısız Hata
		});
    });//hash
	
});

Router.post("/signIn",(req,res)=>{
	//Veri parselleme
	const {email,password} = req.body.user;
	//Veri veritabanına kayıt
	mysqlConnetion.query("SELECT * FROM users WHERE email=?",email,(err, result, fields)=>{
		if(!err){
			console.log(email+" kişisinin kaydı bulundu.");//Başarılı
			console.log(result[0].password);
			bcrypt.compare(password, result[0].password, function(err, data) {
				if(data)
					res.send(result[0].name+" Hoşgeldin.");//Başarılı
				else	
					console.log("Parola yanlış");//Başarısız Hata
			});//hash
		}
		else	
			console.log(err);//Başarısız Hata
	});
	
	
});

module.exports = Router;