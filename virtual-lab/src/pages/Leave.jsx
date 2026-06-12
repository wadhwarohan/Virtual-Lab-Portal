import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import {
  PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon,
  CalendarIcon, CheckCircleIcon, XCircleIcon, ClockIcon,
  SearchIcon, FilterIcon, XIcon
} from "lucide-react";
import { dummyLeaveData } from "../assets/assets";
// import LeavesHistory from '../components/leave/LeavesHistory'
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";

const Leave = () => {
  const [leaves, setLeaves]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);  
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  if (loading) return <Loading />;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount      = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount    = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const personalCount    = approvedLeaves.filter((l) => l.type === "PERSONAL").length;

  const leaveStats = [
    { label: "Sick Leave",   value: sickCount,   icon: ThermometerIcon, total: 10, accent: "bg-rose-500",    iconBg: "bg-rose-100",    iconColor: "text-rose-500",    bar: "bg-rose-400",    badge: "bg-rose-100 text-rose-700",    border: "border-rose-200"    },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon,    total: 12, accent: "bg-sky-500",     iconBg: "bg-sky-100",     iconColor: "text-sky-500",     bar: "bg-sky-400",     badge: "bg-sky-100 text-sky-700",     border: "border-sky-200"     },
    { label: "Personal Leave", value: personalCount, icon: PalmtreeIcon,    total: 15, accent: "bg-emerald-500", iconBg: "bg-emerald-100", iconColor: "text-emerald-500", bar: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" },
  ];

//   const statusStyle = {
//     APPROVED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
//     PENDING:  "bg-amber-100 text-amber-700 border border-amber-200",
//     REJECTED: "bg-red-100 text-red-700 border border-red-200",
//   };

  return (
    <div className="animate-fade-in space-y-8 pb-8">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isAdmin ? "Manage all employee leave applications" : "Track your leave balance and requests"}
          </p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 hover:shadow-md w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-4 h-4" />
            Apply for Leave
          </button>
        )}
      </div>

      {/* ── Leave balance cards ── */}
      {!isAdmin && (
        <div className="flex flex-col mt-20">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400"> Pending Leave Balance </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
            {leaveStats.map((s, i) => {
              return (
                <div key={i} className={`bg-white rounded-2xl border ${s.border} shadow-sm overflow-hidden hover:shadow-md transition-all duration-200`}>
                  <div className={`h-1 w-full ${s.accent}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                        <s.icon className={`w-5 h-5 ${s.iconColor}`} />
                      </div>
                      
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-0.5">{s.label}</p>
                    <div className="flex items-end gap-1.5 mb-3">
                      <span className="text-3xl font-bold text-slate-900 leading-none">{s.value}</span>
                      <span className="text-sm text-slate-400 mb-0.5">taken</span>
                    </div>
                    
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      )}
      
       
      {/* <LeavesHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/> */}
      <ApplyLeaveModal open={showModal} onClose={()=>setShowModal(false)} onSuccess={fetchLeaves}/> 
    </div>
    
  );
   
};


export default Leave;

