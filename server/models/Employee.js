import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        unique:true,
    },
    firstName: {
        type:String,
        required:true,
    },  
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },

},{timestamps:true})

const Employee = mongoose.models.Employee || mongoose.model("Employee",employeeSchema)

export default Employee;