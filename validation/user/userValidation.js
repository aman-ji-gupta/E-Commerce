const user = require("./userSchema");
module.exports = {
    registerUserValidation  : async (req,res,next)=>{
        const value = await user.registerUser.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.status(400).json({
                Status: "Failed",
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    } ,

    loginUserValidation : async (req,res,next) =>{
        const value = await user.loginUser.validate(req.body , {abortEarly : false});
        if(value.error){
            res.status(400).json({
                Status: "Failed",
                message: value.error.details[0].message
            })
        }else{
            next()
        }
    },
}