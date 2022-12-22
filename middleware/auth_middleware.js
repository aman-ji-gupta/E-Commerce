const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");

const checkUserAuth = async (req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            token = authorization.split(" ")[1];
            const { userId } = jwt.verify(token , process.env.SECRET_KEY);
            //get user from token
            req.userSchema = await userSchema.findById(userId).select("-password");
            next();
        }catch(err){
            res.status(500).send({
                status : "failed",
                message : "Internal Server Error..!"
            })
        }
    }
}
module.exports={
    checkUserAuth
}