import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    website:{
        type:String,
        
    },
    description:{
        type:String, 
    },
   location:{
        type:String,
       
    },
  logo:{
        type:String,
       
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,

    }



},{timestamps:true})


export const Company = mongoose.model("Company",companySchema)