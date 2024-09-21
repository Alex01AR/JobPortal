import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";


const cmpnyregister = async (req, res) => {
  try {
    const { companyName} = req.body;

    if (!companyName ) {
      return res.status(400).json({
        message: "All field is required ",
        success: false,
      });
    }

    const company = await Company.findOne({companyName});

    if (company) {
      return res.status(400).json({
        message: "Company is Already existed",
        success: false,
      });
    }

    const createcompany = await Company.create({
      name:companyName,
    userId: req.id,
    });

    if (!createcompany) {
      return res.status(400).json({
        message: "Company is not creates",
        success: false,
        createcompany,
      });
    }

    return res.status(200).json({
      message: "Successfully company is ceated ",
      createcompany,
      success: true,
    });
  } catch (error) {
    console.log(error, "error in company registration");
  }
};


// const getCompany = async (req, res) => {

//   try {
//     const userId = req.id; //middleware
//     const companies = await Company.find({ userId });
//     if (!companies) {
//       return res.status(400).json({
//         message: "company cann't find ",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       message: "companies find",
//       success: true,
//       companies,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


const getCompany = async (req, res) => {
  try {
    const userId = req.id; // Assumes 'req.id' is set by middleware
    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies found successfully.",
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
    });
  }
};



const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; //middleware
    const company = await Company.findById({_id:companyId });
    if (!company) {
      return res.status(400).json({
        message: "company cann't find ",
        success: false,
      });
    }
    return res.status(200).json({
      message: "companies find",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req,res) => {

    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
    
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location,logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
               
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true,
            company
        })
        
    } catch (error) {
        console.log(error,"error in updating company");
        
    }
}




export { cmpnyregister, getCompany, getCompanyById, updateCompany };
