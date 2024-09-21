import { Job } from "../models/job.model.js";
import {Company} from "../models/company.model.js"
//Admin post job

const postjob = async (req, res) => {
  try {
    
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      position,
      expreincelevel,
      companyId,
    } = req.body;
    const userId = req.id;
    if (!title || !description || !requirement || !salary || !location || !jobType ||     !position || !expreincelevel || !companyId) {
      return res.status(400).json({
        message: "All field are required to make job",
        title,
      description,
      requirement,
      salary,
      location,
      jobType,
      position,
      expreincelevel,
      companyId,
        success: false,
      });
    }
    // const job = await Job.findOne({title})
    // if(job){
    //     return res.status(200).json({
    //         message: "All field are required to make job",
    //         success: false
    //     })
    // }
    // console.log(requirement);
    // console.log(position)
    let reqArray;
    if( requirement){
      reqArray =  requirement.split(",");
  }

    const job = await Job.create({
      title,
      description,
      requirement: reqArray,
      salary: Number(salary),
      location,
      jobType,
      position:position,
      expreinceLevel:expreincelevel,
      company: companyId,
      created_by: userId,
    });
    if (!job) {
      return res.status(200).json({
        message: "Job is not created",
        success: false,
      });
    }
// console.log(job)
    return res.status(200).json({
      message: "new Job  created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error, "job creating problem");
  }
};
//student
const getallJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//student
const getJobbyId = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
  });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "job find successfully ",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error, "during get jobbyid");
  }
};






//Admin hom many jobs are created fro that
const getAdminjob = async (req, res) => {
  try {
    const adminId = req.id;
    console.log(adminId)
    const jobs = await Job.find({ created_by: adminId }).populate({
      path:'company',
      createdAt:-1
  });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
       
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs finds",
      jobs,
      success:true,
    });
  } catch (error) {
    console.log( "admin job error",error);
  }
};

export { postjob, getallJobs, getJobbyId, getAdminjob };
