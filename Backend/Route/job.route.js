import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  getAdminjob,
  getJobbyId,
  postjob,
  getallJobs,
} from "../controller/job.controller.js";

const router = Router();

router.route("/post").post(auth, postjob);
router.route("/get").get(getallJobs);
router.route("/getAdminJobs").get(auth, getAdminjob); //check again with single login or get/:id
router.route("/get/:id").get(getJobbyId);

export default router;
