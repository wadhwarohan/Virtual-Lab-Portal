import React from 'react'
import {
  CalendarDaysIcon, CheckCircleIcon, ClockIcon,
  XCircleIcon, PlusIcon, TrendingUpIcon,
  UmbrellaIcon, HeartIcon, BriefcaseIcon,CalendarIcon
} from "lucide-react";
import { dummyEmployeeDashboardData } from "../assets/assets";
import { Link } from 'react-router-dom';
const EmployeeDashboard=({data = dummyEmployeeDashboardData})=>{
    

    const cards=[
        {
             title: "Casual Leave",
            value: data.currentMonthAttendance,
            total: 12,
            icon: UmbrellaIcon,
            color: "blue",
            bg: "bg-blue-50",
            iconColor: "text-blue-500",
            border: "border-blue-200",
            bar: "bg-blue-500",
            badge: "bg-blue-100 text-blue-700",
        },
        {
           title: "Sick Leave",
            value: data.pendingLeaves ?? 0,
            total: 10,
            icon: HeartIcon,
            color: "rose",
            bg: "bg-rose-50",
            iconColor: "text-rose-500",
            border: "border-rose-200",
            bar: "bg-rose-500",
            badge: "bg-rose-100 text-rose-700",
    },
        {
             title: "Personal Leave",
            value: data.pendingLeaves,
            total: 6,
            icon: BriefcaseIcon,
            color: "violet",
            bg: "bg-violet-50",
            iconColor: "text-violet-500",
            border: "border-violet-200",
            bar: "bg-violet-500",
            badge: "bg-violet-100 text-violet-700",
            },
    ]

    const leaveDetailCard=[
        {
            title: "Leave Applied",
            value: data.currentMonthAttendance ?? 0,
            icon: CalendarDaysIcon,
            bg: "bg-indigo-50",
            iconColor: "text-indigo-500",
            border: "border-indigo-100",
            textColor: "text-indigo-600",
        },
       {
      title: "Leave Approved",
      value: data.pendingLeaves ,
      icon: CheckCircleIcon,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      border: "border-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      title: "Leave Pending",
      value: data.pendingLeaves ,
      icon: ClockIcon,
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
      border: "border-amber-100",
      textColor: "text-amber-600",
    },
    {
      title: "Leave Rejected",
      value: data.pendingLeaves ,
      icon: XCircleIcon,
      bg: "bg-red-50",
      iconColor: "text-red-500",
      border: "border-red-100",
      textColor: "text-red-600",
    },
    ]
    
    return (
    <div className="space-y-8 pb-8">

      {/* ── Header greeting ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Leave Overview</h2>
          <p className="text-sm text-slate-500 mt-0.5">Track your leave balance and history</p>
        </div>
        {/* <button
          onClick={() => window.location.href = '/leave'}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 hover:shadow-md"
        >
          <PlusIcon className="w-4 h-4" />
          Apply for Leave
        </button> */}
      </div>

      {/* ── Leave balance cards ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUpIcon className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Leave Balance</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            
            return (
              <div
                key={i}
                className={`relative bg-white rounded-2xl border ${card.border} p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group`}
              >
                {/* Soft background glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${card.bg} opacity-60 -translate-y-8 translate-x-8`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mb-3">{card.value}
                    <span className="text-base font-normal text-slate-400 ml-1">remaining</span>
                  </p>
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Leave stats ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarDaysIcon className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Leave Details</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {leaveDetailCard.map((stat, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border ${stat.border} p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3`}
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor} mt-0.5`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
export default EmployeeDashboard;