const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const mysqlConnetion = require("../model/connection");
const authenticationConnection = require("../controller/authentication");


Router.post("/update",(req,res,next)=>{
	//Veri parselleme
    const {name,email,password} = req.body.update_user;
    const first_email = req.body.user.email;
    
    //Verinin veritabanına kayıt işlemi şifre girildiyse
    if(password==""){

        mysqlConnetion.query("UPDATE users SET name=?,email=? WHERE email=?",[name,email,first_email],(err, result)=>{
            if(!err){
                //Yeni token oluşturmak için yeni oturum değerlerini değiştir.
                req.body.user.name = name;
                req.body.user.email = email;
                //Token oluşturulabilmesi için user'ın içindeki iat ve exp değerlerini sil.
                delete req.body.user.iat;
                delete req.body.user.exp;
                //Yeni token oluştur.
                authenticationConnection.sendToken(req,res,req.body.user.id);
            }
            else	
                console.log(err);//Başarısız Hata
        });
    }
    else{

        bcrypt.hash(password, 10, function(err, hash) {
            mysqlConnetion.query("UPDATE users SET name=?,email=?,password=? WHERE email=?",[name,email,hash,first_email],(err, result)=>{
                if(!err){
                    //Yeni token oluşturmak için yeni oturum değerlerini değiştir.
                    req.body.user.name = name;
                    req.body.user.email = email;
                    //Token oluşturulabilmesi için user'ın içindeki iat ve exp değerlerini sil.
                    delete req.body.user.iat;
                    delete req.body.user.exp;
                    //Yeni token oluştur.
                    authenticationConnection.sendToken(req,res,req.body.user.id);
                }
                else	
                    console.log(err);//Başarısız Hata
            });
        });
    }
	
	
});

module.exports = Router;