

//Get dashboard for employee and admin
//GET /api/dashboard

import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

export const getDashboard = async (req,res) =>{
    try {
        const session = req.session;
        if(session.role === 'ADMIN'){
            const [totalEmployees,pending] = await Promise.all([Employee.countDocuments({isDeleted:{$ne:true}}),
                LeaveApplication.countDocuments({status:"PENDING"})
            ])
            return res.json({role:"ADMIN",
                totalEmployees,
                pendingLeaves
            })
        }
        else{
            const employee = await Employee.findOne({
                userId:session.userId,
            }).lean();
            if(!employee) return res.status(404).json({error : "Employee not found"});

            const today = new Date()
            const [pendingLeaves]=LeaveApplication.countDocuments({
                employeeId:employee._id,
                status:"PENDING",

            })

            return res.json({
                role:"EMPLOYEE",
                employee :{...employee, id:employee_id.toString()},
                pendingLeaves
            })
        }

    } catch (error) {
        console.error("dashboard error",error)
        return res.status(500).json({error:"failed"});
    }
}