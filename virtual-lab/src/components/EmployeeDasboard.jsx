import React from 'react'
import { CalendarIcon } from "lucide-react";
import { dummyEmployeeDashboardData } from "../assets/assets";
import { Link } from 'react-router-dom';
const EmployeeDashboard=({data = dummyEmployeeDashboardData})=>{
    

    const cards=[
        {
            icon:CalendarIcon,
            value:data.currentMonthAttendance,
            title:"Casual Leave",
        },
        {
            icon:CalendarIcon,
            value:data.pendingLeaves,
            title:"Sick Leave ",
        },
        {
            icon:CalendarIcon,
            value:data.pendingLeaves,
            title:"Personal Leave ",
        },
    ]

    const leaveDetailCard=[
        {
            icon:CalendarIcon,
            value:data.currentMonthAttendance,
            title:"Leave Applied",
        },
        {
            icon:CalendarIcon,
            value:data.pendingLeaves,
            title:"Leave Approved",
        },
        {
            icon:CalendarIcon,
            value:data.pendingLeaves,
            title:"Leave pending",
            
        },
        {
            icon:CalendarIcon,
            value:data.pendingLeaves,
            title:"Leave Rejected",
            
        },
    ]
    console.log("card value:",cards[0].value)

    return(
        <div className="animate-fade-in mt-15">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 ">
            {cards.map((card,index)=>(
                <div key={index} className=" bg-white p-4 rounded-lg shadow border-l-4 border-[#1e3a8a]card card-hover p-5 sm:p-6 relative overflow -hidden group flex items-center justify-between  ">
                    <div>
                        
                        <p className='text-sm font-medium text-slave-700 '>{card.title}</p>
                        <p className='text-2xl font-bold text-slave-900'>{card.value}</p>
                        
                    </div>
                    <card.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group:hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />

                </div>
            ))}
           </div>
           <div className='mt-12'>
            <h4 className='text-center text-2xl font-bold mb-10'>Leave Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {leaveDetailCard.map((card,index)=>(
                <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-[#1e3a8a]card card-hover p-5 sm:p-6 relative overflow -hidden group flex items-center justify-between">
                    <div>
                        
                        <p className='text-sm font-medium text-slave-700'>{card.title}</p>
                        <p className='text-2xl font-bold text-slave-900'>{card.value}</p>
                        
                    </div>
                    <card.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group:hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />

                </div>
            ))}
           </div>
           <Link to='/leave' className='btn-primary text-center inline-flex items-center justify-center gap-2'>
            Apply for Leave
           </Link>
           </div>
        </div>
    )
}
export default EmployeeDashboard;