import Employee from "../models/Employee.js"
import bcrypt from "bcrypt"
import User from "../models/User.js"

//Get Employee
//GET / api/employee
export const getEmployees = async (req, res) => {
    try {
        const { search } = req.query;

        // Build filter — if search param exists, match firstName or lastName
        const filter = {};
        if (search && search.trim() !== "") {
            filter.$or = [
                { firstName: { $regex: search.trim(), $options: "i" } },  // case-insensitive
                { lastName:  { $regex: search.trim(), $options: "i" } },
                { email:     { $regex: search.trim(), $options: "i" } },  // bonus: search by email too
            ];
        }

        const employees = await Employee.find(filter);

        return res.status(200).json({ success: true, employees });

    } catch (error) {
        console.error("Get employees error:", error);
        return res.status(500).json({ error: "Failed to fetch employees" });
    }
};

//create Employee
//POST /api/employee
export const createEmployees = async (req,res)=>{
    try{
        const {firstName,lastName,email,password} =req.body;

        if(!email || !password || !firstName || !lastName)
        {
            return res.status(400).json({error: "Missing required fields.."})
        }

        const hashed = await bcrypt.hash(password,10)
        const user = await User.create({
            email,
            password:hashed,
            role:role || "EMPLOYEE"
        })

        const employee = await Employee.create({
            userId:user._id,
            firstName,
            lastName,
            email,
        })

        return res.status(201).json({success:true,employee})

    }
    catch(error){
        if(error.code === 11000)
        {
            return res.status(400).json({error: "Email already exists"})
        }
        console.error("Create employee error:", error)
        return res.status(500).json({error: "Failed to create employee"})

    }
}

//update Employee
//PUT /api/employee/:id
export const updateEmployees = async (req,res)=>{
    try{

        const {id} = req.params
        const {firstName,lastName,email,password} =req.body;

        const employee = await Employee.findById(id)
        if(!employee)
            return res.status(404).json({error:"Employee Not Found"})


        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
        })
        // Update User Record
        const userUpdate = {email}
        if(role) userUpdate.role = role;
        if(password) userUpdate.password = await bcrypt.hash(password,10) 
        await User.findByIdAndUpdate(employee.userId,userUpdate)

        return res.json({success:true})

    }
    catch(error){
        if(error.code === 11000)
        {
            return res.status(400).json({error: "Email already exists"})
        }
       
        return res.status(500).json({error: "Failed to update employee"})

    }

}

//delete Employee
//DELETE /api/employee/:id
export const deleteEmployees = async (req,res)=>{
    try{
        const {id} = req.params;
        const employee = await Employee.findById(id)
        if(!employee) return res.status(404).json({error: "Employee not found.."})
        
        employee.isDeleted = true;
        await employee.save()
        return res.json({success: true});
    }
    catch(error){
         return res.status(500).json({error: "Failed to delete employee"})
    }

}