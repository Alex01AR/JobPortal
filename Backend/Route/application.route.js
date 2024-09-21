import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { applyjobs,   getApplicants,   getAppliedJobs, updateStatus, } from "../controller/Application.controller.js";



const router =Router();

router.route("/apply/:id").get(auth,applyjobs);//give some error like push ,but work properly

router.route("/get").get(auth,getAppliedJobs);
router.route("/:id/applicants").get(auth, getApplicants);//not working
router.route("/status/:id/update").post(auth,updateStatus);

export default router