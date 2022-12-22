const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service : "gmail",
    auth :{
        user : "amanguptaeducation@gmail.com",
        pass : "xufhijqmkmdobzne"
    }
});

//send out email through nodemailer
var mailOptions = {
    from: "amanguptaeducation@gmail.com",
    to: "arun.lal@graffersid.com",
    subject: "hey..this is a test mail",
    text: "hey this is body part"
}

module.exports={
    transporter,mailOptions
}
