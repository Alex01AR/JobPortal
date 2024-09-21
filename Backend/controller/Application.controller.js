import { Application } from "../models/Application.model.js";
import { Job } from "../models/job.model.js";

const applyjobs = async (req, res) => {
  try {
    const userId = req.id;

    const JobId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        message: "userid is required",
        success: false,
      });
    }
    if (!JobId) {
      return res.status(400).json({
        message: "Jobid is required",
        success: false,
      });
    }
    //check if the user has already applied
    const existingApplication = await Application.findOne({
      job: JobId,
      applicant: userId,
    });

    if(existingApplication){
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false,
      });
    }
    // check if the jobs exists
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not find ",
        success: false,
      });
    }
    // create a new Application
    const newApplication = await Application.create({
      job: JobId,
      applicant: userId,
    });


    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Job applied Successfully  ",
      job,
      success: true ,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// admin dekhega kitna user ne apply kiya hai
// const getApplicants = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId).populate({
//       path: "applications",
//       options: { sort: { createdAt: -1 } },
//       populate: {
//         path: "applicant",
//       },
//     });
//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found.",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       job,
//       succees: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getApplicants = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById({jobId}).populate({
//       path: "applications",
//       options: { sort: { createdAt: -1 } },
//       populate: {
//         path: "applicant",
//       },
//     });
  
    
//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found.",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Applicants retrieved successfully.",
//       success: true,
//       job,
//     });
//   } catch (error) {
//     console.error("Error during getApplicants:", error);
//     return res.status(500).json({
//       message: "Server error during applicants retrieval.",
//       success: false,
//     });
//   }
// };

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants retrieved successfully.",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error during getApplicants:", error);
    return res.status(500).json({
      message: "Server error during applicants retrieval.",
      success: false,
    });
  }
};


const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { applyjobs, updateStatus, getApplicants, getAppliedJobs };
