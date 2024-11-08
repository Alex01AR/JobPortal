import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    const file = req?.file;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All field is necessary in registration",
        success: false,
      });
    }

// const fileUri = getDataUri(file);
// const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

let cloudResponse = null;

// Upload the file to Cloudinary only if the file exists
if (file) {
  const fileUri = getDataUri(file);  // Convert file to data URI
  cloudResponse = await cloudinary.uploader.upload(fileUri?.content);  // Upload to Cloudinary
}




    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already is present ",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      fullName,
      email: email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile:{
        profilePhoto:cloudResponse?.secure_url,
      }
    });
    return res.status(200).json({
      message: "Account created successfully  ",
      createUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email && !password && !role) {
      return res.Status(400).json({
        message: "All field is necessary in login",
        success: false,
      });
    }
    // console.log(req.body);

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User doesn't find ",
        success: false,
      });
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);

    if (!ispasswordMatch) {
      return res.status(400).json({
        message: "password is not matched ",
        success: false,
      });
    }
    //check role is correct or not

    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't exist with current role ",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECERET_KEY, {
      expiresIn: "1d",
    });
    const loggedInUser = await User.findById(user._id).select("-password ");
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 1000,
        httpsOnly: true,
        secure: true,
        // sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        loggedInUser,
        success: true,
      });
  } catch (error) {
    console.log(error, "login failed");
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxaAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, "problem during logout ");
  }
};

const updateProfile = async (req, res) => {
  try {
    const file = req?.file;
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    
// const fileUri = getDataUri(file);
// const cloudResponse = await cloudinary.uploader.upload(fileUri?.content)

let cloudResponse = null;

// Upload the file to Cloudinary only if the file exists
if (file) {
  const fileUri = getDataUri(file);  // Convert file to data URI
  cloudResponse = await cloudinary.uploader.upload(fileUri?.content);  // Upload to Cloudinary
}


    let skillsArray = [];
    if (typeof skills === "string") {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({
        message: "User not find ",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

  if(cloudResponse){
    user.profile.resume = cloudResponse?.secure_url
    user.profile.resumeOringinalName = file?.originalname
  }

    await user.save();


    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
     role:user.role,
     profile:user?.profile
    };



    // console.log(user);
    return res.status(200).json({
      message: "pROFILE Updated successfully  ",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error, "  errpr update profile so that ");
  }
};






export { register, loginUser, logoutUser, updateProfile };
