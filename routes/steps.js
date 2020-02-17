const express = require("express");
const Router = express.Router();
const mysqlConnetion = require("../model/connection");


//Atılan adım kayıtları
Router.post("/add",(req,res)=>{
        const {step_number,step_start_date,step_time,step_distance} = req.body.steps;

        mysqlConnetion.query("INSERT INTO steps (user_id,step,start_time,time,distance,is_used) VALUES (?,?,?,?,?,?)",[req.body.user.id,step_number,step_start_date,step_time,step_distance,0],(err, rows, fields)=>{
                if(!err){
                        updateTotalStep(req.body.user.id,step_number);
                        res.send("Başarılı adım kaydı");
                }
                else{
                        console.log(err);//Başarısız Hata
                }
        });
});

function updateTotalStep(user_id,new_step){
        mysqlConnetion.query("SELECT steps FROM users WHERE id=?",[user_id],(err,result,fields)=>{
                if(!err){
                        const int_new_steps = parseInt(new_step,10);
                        const int_result = parseInt(result[0].steps,10);

                        mysqlConnetion.query("UPDATE users SET steps=? WHERE id=?",[int_new_steps+int_result,user_id],(err)=>{
                                if(err){
                                        console.log("Toplam adım güncellenirken sorun oluştu.");
                                        console.log(err);//Başarısız Hata
                                }
                        });
                }
                else{
                        console.log("Toplam adım sayısı alınamadı.");
                        console.log(err);//Başarısız Hata
                }
        });
};




//Günlük adım sorgusu saatlik dizi halinde gönder her saat için bir indis örneğin hour[0]=00:00-01:00 saatlerini temsil eder hour[1]=01:00-02:00 saat aralığını temsil eder. Json gönder
Router.post("/daily",(req,res)=>{
        console.log("Adım sayısı başarı ile güncelendi.");
        console.log(req.body);
        res.send(req.body.user.name + " kişisi " + req.body.steps.step +" adım atmıştır");
});
//Haftalık adım sorgusu günlük dizi halinde gönder her gün için bir indis örneğin örneğin day[0]=Pazartesi
Router.post("/weekly",(req,res)=>{
        console.log("Adım sayısı başarı ile güncelendi.");
        console.log(req.body);
        res.send(req.body.user.name + " kişisi " + req.body.steps.step +" adım atmıştır");
});
//Aylık adım sorgusu günlük dizi halinde gönder her gün için bir indis örneğin örneğin day[0]=Ayın 1. günü day[30]=Ayın 30. günü
Router.post("/monthly",(req,res)=>{
        console.log("Adım sayısı başarı ile güncelendi.");
        console.log(req.body);
        res.send(req.body.user.name + " kişisi " + req.body.steps.step +" adım atmıştır");
});
//Yıllık adım sorgusu aylık dizi halinde gönder her ay için bir indis örneğin örneğin mounth[0]=Ocak
Router.post("/yearly",(req,res)=>{
        console.log("Adım sayısı başarı ile güncelendi.");
        console.log(req.body);
        res.send(req.body.user.name + " kişisi " + req.body.steps.step +" adım atmıştır");
});

//Adım doğrulama fonksiyonu. Adımların hilesiz bir şekilde sayıldığını doğrulamak için kullanılır.
function step_verification(step,km){

}


module.exports = Router;