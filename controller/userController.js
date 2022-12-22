const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../service/mailService");


const userSignUp = async (req,res)=>{
    const userData = new userSchema(req.body);
    const newuserData = new userSchema(req.body);
    const {email,password,confirmPassword,gender}= req.body;
    const emailExists = await userSchema.findOne({email : email});

    try{
    if(emailExists){
        res.status(409).json({
            status : "Failed",
            "Message" : "User Already Registered...!"
        })
    } else if(password == confirmPassword){
        const salt = await bcrypt.genSalt(10);
        newuserData.password= await bcrypt.hash(password,salt);

        // const filePath = `/uploads/${req.file.filename}`;
        // newuserData.profilepic = filePath;
        if(gender=="male"){
            newuserData.profilepic = "/uploads/maleavatar.png";
        }else{
            newuserData.profilepic = "/uploads/femaleavatar.png";
        }
            
        const addRes = await newuserData.save();
        res.status(200).json(addRes);
    }else{
        res.status(401).json({
            status : "Failed",
            "Message" : "Password & ConfirmPassword should be matched...!"
        }) 
    }
}catch(err){
    res.status(500).json({
        status : "Failed",
        "Message" : "Internal server error...!"
    })
}
 
}

const userLogin = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userSchema.findOne({ email: email });
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (user.email === email && isMatch) {
                    //generate jwt
                    const token = jwt.sign({
                        UserID: user._id
                    },
                        process.env.SECRET_KEY, { expiresIn: '5d' })
                        res.status(200).send({
                        status: "success",
                        message: "Login success",
                        token: token
                    })
                } else {
                    res.status(401).send({
                        status: "failed",
                        message: "unauthorized user..!"
                    })
                }
            }else{
                console.log("failed");
            }
        }
    } catch (err) {
        res.status(500).send({
            status: "failed",
            message: "Internal Server Error..!"
        })
    } 
}

const sendUserResetPasswordEmail = async (req,res)=>{
    const {email} = req.body;
    console.log("aa gya");
    if(email){
        const emailExists = await userSchema.findOne({email : email});
        if(emailExists){
            try{
                const secret = emailExists._id + process.env.SECRET_KEY;
                //sign jwt
                const token = jwt.sign(
                    {userID : emailExists._id}, secret , {expiresIn :"5d"}
                )
                const link = `http://127.0.0.1:3000/api/user/reset/${emailExists._id}/${token}`;
                
                let info =transporter.sendMail({
                    from : "amanguptaeducation@gmail.com",
                    to : emailExists.email,
                    subject : "Password reset link",
                    html: ` <a href=${link}> Click here to reset password </a>`
                })

                res.status(200).send({
                    status : "success",
                    message : "please check your mail..",info,
                    token : token
                })
            }catch(err){
                res.status(500).send({
                    status : "failed",
                    message : "Internal Server Error..!"
                })
            }
        }else{
            res.status(401).send({
                status : "failed",
                message : "unauthorized user..!"
            })
        }

    }else{
        res.status(400).send({
            status : "failed",
            message : "Email is required..!"
        })
    }

}

const resetPassword = async (req,res)=>{
    const { password, confirm_pass } = req.body;
    const { id, token } = req.params;
    const user = await userSchema.findById(id);
    const new_secret = user._id + process.env.SECRET_KEY;
    try {
        jwt.verify(token, new_secret)
        if (password && confirm_pass) {
            if (password != confirm_pass) {
                res.status(400).send({
                    "status": "failed",
                    "message": "password and confirm password should be same",
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const new_password = await bcrypt.hash(password, salt);
                await userSchema.findByIdAndUpdate(user._id, { $set: { password: new_password } })

                res.status(200).send({
                    "status": "success",
                    "message": "password reset successfully",
                })
            }

        } else {
            res.status(400).send({
                "status": "failed",
                "message": "all fields are required",
            })
        }
    } catch (error) {
        res.status(500).send({
            status : "failed",
            message : "Internal Server Error..!"
        })
    }
}

const updateProfile = async (req,res)=>{
    try{
        const userId = req.params.id;
        const {password} = req.body;

        const filePath = `/uploads/${req.file.filename}`;
      // userId.profilepic = filePath;
        const updatedProfile = await userSchema.findByIdAndUpdate(userId ,{
            $set :{
                name : req.body.name,
                contact : req.body.contact,
                password : req.body.password,
                profilepic : req.body.filePath            
            }
            } , {new:true})
        res.status(200).json(updatedProfile);

    }catch(err){
        res.status(500).json({
            status : "Failed",
            Message : "Internal server error...!"+err.message
        })
    }
}
module.exports={
    userSignUp,userLogin,sendUserResetPasswordEmail,resetPassword,updateProfile
}
