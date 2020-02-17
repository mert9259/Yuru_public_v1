const mysql = require("mysql");

var mysqlConnetion = mysql.createConnection({
	host:"yuru-database.chbyqaukfqjr.us-east-2.rds.amazonaws.com",
	user:"root",
	password:"yuru2020",
	database:"yuru",
	multipleStatements:true
});

mysqlConnetion.connect((err)=>{
	if(!err)
	    console.log("Connected");
	else
	    console.log("Connection Failed");
})

module.exports = mysqlConnetion;