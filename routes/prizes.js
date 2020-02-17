const express = require("express");
const Router = express.Router();
const mysqlConnetion = require("../model/connection");


//Atılan adım kayıtları
Router.post("/get",(req,res)=>{
    let date_ob = new Date();
    var dateString = date_ob.getFullYear()+"-"+date_ob.getMonth()+"-"+date_ob.getDate();

    console.log(dateString);
    mysqlConnetion.query("SELECT brand,product_name,step_goal,product_description,product_image,date_of_expiration FROM prizes WHERE prize_number>0 AND date_of_expiration>?",[dateString],(err, rows, fields)=>{
            if(!err){
                    console.log(rows);
                    res.send(rows);
            }
            else{
                    console.log(err);//Başarısız Hata
            }
    });
});

module.exports = Router;