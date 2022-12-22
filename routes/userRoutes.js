const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validation = require("../validation/user/userValidation");
const auth = require("../middleware/auth_middleware");
const {upload} = require("../middleware/imageStorage")

router.post("/signup",validation.registerUserValidation,userController.userSignUp);
router.post("/login",validation.loginUserValidation,userController.userLogin);
router.post("/reset-password-mail",auth.checkUserAuth,userController.sendUserResetPasswordEmail);
router.post("/reset-password/:id/:token",userController.resetPassword);
router.patch("/update-profile/:id/",upload.single("profilepic"),userController.updateProfile);

module.exports=router;