const joi = require("@hapi/joi");
const schema = {
    registerUser : joi.object({
        name : joi.string().max(20).required(),
        email :joi.string().email().required(),
        contact : joi.number().min(1000000000).max(9999999999).message("invalid mobile number").required(),
        password :joi.string().min(6).required(),
        confirmPassword :joi.string().min(6).required(),
        gender : joi.string().required()
    }).unknown(true),

    loginUser : joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(6).required()
    }).unknown(true),
}

module.exports=schema;