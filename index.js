const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(express.json());
require("./model/config");
const CommonRoutes = require("./routes/commonRoutes");

app.use('/',CommonRoutes);
const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server started at port ${process.env.PORT}`);
})

module.exports=server;
