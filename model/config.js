const mongoose = require("mongoose");


mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connected successfully..!");
})
