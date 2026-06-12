import { UsersIcon } from "lucide-react";

const AdminDashboard =() =>{
    const stats =[
            {
            label: "Total Employees",
            value: data.totalEmployees,
            icon: UsersIcon,
            color: "blue",
            bg: "bg-blue-50",
            iconColor: "text-blue-500",
            border: "border-blue-200",
            bar: "bg-blue-500",
            badge: "bg-blue-100 text-blue-700",
            description:"Active Workforce"
        },
         {
            label: "Total Employees",
            value: data.totalEmployees,
            icon: UsersIcon,
            color: "blue",
            bg: "bg-blue-50",
            iconColor: "text-blue-500",
            border: "border-blue-200",
            bar: "bg-blue-500",
            badge: "bg-blue-100 text-blue-700",
            description:"Active Workforce"
        },
        ]
    return(
        
        <div>
            AdminDashboard
        </div>
    )
}
export default AdminDashboard;