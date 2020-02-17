const express = require("express");
const Router = express.Router();
const mysqlConnetion = require("../model/connection");


//Atılan adım kayıtları
Router.post("/get",(req,res)=>{

    const {prize_id} = req.body;
    const user_id = req.body.user.id;
    const CODE = makeCode();
    
    isUsed(user_id,prize_id,function(bool_result){
        if(bool_result){
            
            mysqlConnetion.query("INSERT INTO coupons (prize_id,user_id,coupon_code,is_used,state) VALUES (?,?,?,?,?)",[prize_id,user_id,CODE,0,"ACTIVE"],(err)=>{
                if(!err){
                    res.send("Tebrikler." + CODE + " kodu ile indirimli alışveriş yapmaya hak kazandınız.");
                }
                else{
                    console.log(err);//Başarısız Hata
                }
            });
        }
        else{
            console.log("Adım sayınız yetersiz");
        }
    });
    
});

function deleteStepForUsed (user_id){
    mysqlConnetion.query("UPDATE steps SET is_used=1 WHERE user_id=? AND is_used=0",[user_id],(err)=>{
        if(err){
            console.log("Adım sayıları kullanıldı olarak işaretlenirken bir hata oluştu.");
            console.log(err);//Başarısız Hata
        }
    });
    
};

function deleteStepForTotelStep(user_id,total_step){
    mysqlConnetion.query("UPDATE users SET steps=? WHERE id=?",[total_step,user_id],(err)=>{
        if(err){
            console.log("Toplam adım güncellenirken sorun oluştu.");
            console.log(err);//Başarısız Hata
        }
    });
};

function isUsed (user_id,prize_id,callback){
    
    totalStep(user_id,function(total){
        var bool_result
        mysqlConnetion.query("SELECT id,step_goal FROM prizes WHERE id=?",[prize_id],(err,result,fields)=>{
            if(!err){
                console.log(total);
                console.log(result[0].step_goal);
                if(result[0].step_goal<=total){
                    deleteStepForUsed(user_id);
                    deleteStepForTotelStep(user_id,total-result[0].step_goal);
                    bool_result=1;
                }
                else{
                    bool_result=0;
                }
                return callback(bool_result);
            }
            else{
                console.log("Ödülün adım sayısı alınırken hata oluştu veya böyle bir ödül bulunamadı.")
                console.log(err);//Başarısız Hata
            }
        });
    });

};

function totalStep(user_id,callback){

    mysqlConnetion.query("SELECT steps FROM users WHERE id=?",[user_id],(err,result)=>{
        if(!err){
            return callback(result[0].steps);
        }
        else{
            console.log("Kullanıcının toplam adım sayısı alınamadı.");
            console.log(err);//Başarısız Hata
        }
    });

};

function makeCode() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 7; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

module.exports = Router;