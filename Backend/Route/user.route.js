import  Express, { Router }  from "express";
import { loginUser, logoutUser, register, updateProfile } from "../controller/user.controllers.js";
import { auth } from "../middleware/auth.middleware.js";
import { singleUpload } from "../middleware/multer.middleware.js";



const router =Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/update").post(auth,singleUpload, updateProfile);

export { router}