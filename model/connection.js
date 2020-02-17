const mysql = require("mysql");

var mysqlConnetion = mysql.createConnection({
	host:"******",
	user:"*****",
	password:"*****",
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
