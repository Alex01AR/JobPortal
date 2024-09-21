import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    job:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending',
        required:true
    }

},{timestamps:true})


export const Application = mongoose.model("Application",applicationSchema)