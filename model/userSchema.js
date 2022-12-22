const mongoose = require("mongoose");

const userSchema =new  mongoose.Schema({

    name :{
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true
    },
    contact :{
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    },
    confirmPassword :{
        type : String,
        require : true
    },
    profilepic:{
    type : String
    },
    address:{
        type : String,
        require : true
        },
    address:{
     type : String,
     require : true
            },
    gender :{
        type:String,
        require:true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    role:{
        type : String,
        default: "user"
    }
})


userSchema.set('timestamps',true);
module.exports = mongoose.model('User',userSchema);
