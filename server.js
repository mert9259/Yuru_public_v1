const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");



var app = express();
app.use(bodyParser.json());

app.use("/users",userRoutes);


app.listen(80);