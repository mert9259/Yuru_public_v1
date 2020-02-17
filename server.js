const express = require("express");
const bodyParser = require("body-parser");

//Routes
const usersRoutes = require("./routes/users");
const sessionsRoutes = require("./routes/sessions");
const authenticationRoutes = require("./controller/authentication");
const stepsRoutes = require("./routes/steps");
const couponsRoutes = require("./routes/coupons");
const prizesRoutes = require("./routes/prizes");



var app = express();
app.use(bodyParser.json());




app.use("/sessions",sessionsRoutes);
app.use(authenticationRoutes.router);
app.use("/steps",stepsRoutes);
app.use("/users",usersRoutes);
app.use("/coupons",couponsRoutes);
app.use("/prizes",prizesRoutes);


//Yönetici kontrolleri ve fonksiyonları bu bölümde olmalıdır.


app.listen(80,()=>console.log("Sever started on port 80"));