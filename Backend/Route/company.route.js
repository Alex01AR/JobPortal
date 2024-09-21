import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { cmpnyregister,getCompany, getCompanyById, updateCompany, } from "../controller/company.controller.js";
import { singleUpload } from "../middleware/multer.middleware.js";



const router =Router();

router.route("/register").post(auth,cmpnyregister);
router.route("/get").get(auth,getCompany);
router.route("/get/:id").get(auth,getCompanyById);
router.route("/update/:id").put(auth,singleUpload,updateCompany);

export default router