import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
expreinceLevel:{
    type:Number,
    required:true
},
requirement:[{type:String}],
salary:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
jobType:{
    type:String,
    required:true
},
position:{
    type:String,
   
},
company:{
    type:mongoose.Types.ObjectId,
    ref:'Company',
    required:true
},
created_by:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true
},
applications: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
]

    
},{timestamps:true});


export const Job = mongoose.model("Job",jobSchema);