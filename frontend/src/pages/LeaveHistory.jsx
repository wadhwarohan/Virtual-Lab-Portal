import { useCallback, useEffect, useState } from "react";
import { format } from 'date-fns';
import { Check, Loader2, X, CalendarDays, Clock, Users } from "lucide-react";
import Loading from "../components/Loading";
import { dummyLeaveData } from "../assets/assets";

const LeaveHistory = () => {
  const [leaves, setLeaves]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [processing, setProcessing] = useState(null);
  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
    setTimeout(() => setProcessing(null), 1500); // replace with real API call
  };

  const typeStyle = {
    SICK:     { bg: "bg-rose-50",    text: "text-rose-600",    border: "border-rose-200"    },
    CASUAL:   { bg: "bg-sky-50",     text: "text-sky-600",     border: "border-sky-200"     },
    PERSONAL: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    MEDICAL:  { bg: "bg-purple-50",  text: "text-purple-600",  border: "border-purple-200"  },
  };

  const statusConfig = {
    APPROVED: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", label: "Approved" },
    REJECTED: { bg: "bg-red-100",     text: "text-red-700",     dot: "bg-red-500",     label: "Rejected" },
    PENDING:  { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-400",   label: "Pending"  },
  };

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in space-y-6 pb-8">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leave History</h1>
        <p className="text-sm text-slate-500 mt-0.5">View all your past and pending leave requests</p>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isAdmin
              ? <Users className="w-4 h-4 text-slate-400" />
              : <CalendarDays className="w-4 h-4 text-slate-400" />
            }
            <h3 className="font-semibold text-slate-800 text-[15px]">
              {isAdmin ? "All Leave Requests" : "Recent Activity"}
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {leaves.length} record{leaves.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {isAdmin && (
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Employee</th>
                )}
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Dates</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Reason</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                {isAdmin && (
                  <th className="text-center px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 4}>
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                      <CalendarDays className="w-10 h-10 mb-3 opacity-30" />
                      <p className="text-sm font-medium">No leave applications found</p>
                      <p className="text-xs mt-1 opacity-70">Applications will appear here once submitted</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => {
                  const leaveId     = leave._id || leave.id;
                  const type        = leave.type?.toUpperCase();
                  const status      = leave.status?.toUpperCase();
                  const tStyle      = typeStyle[type] || { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };
                  const sConfig     = statusConfig[status] || statusConfig.PENDING;
                  const isProcessing = processing === leaveId;

                  return (
                    <tr key={leaveId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors duration-150">

                      {isAdmin && (
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-indigo-600">
                                {leave.employee?.firstName?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-slate-800 text-[13px]">
                              {leave.employee?.firstName} {leave.employee?.lastName}
                            </span>
                          </div>
                        </td>
                      )}

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tStyle.bg} ${tStyle.text} ${tStyle.border}`}>
                          {leave.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          <span>{format(new Date(leave.startDate), "MMM dd")}</span>
                          {leave.endDate && leave.endDate !== leave.startDate && (
                            <>
                              <span className="text-slate-300">→</span>
                              <span>{format(new Date(leave.endDate), "MMM dd")}</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 max-w-[200px]">
                        <p className="text-[13px] text-slate-500 truncate">{leave.reason}</p>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sConfig.bg} ${sConfig.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sConfig.dot}`} />
                          {sConfig.label}
                        </span>
                      </td>

                      {isAdmin && (
                        <td className="px-5 py-4 text-center">
                          {status === "PENDING" ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleStatusUpdate(leaveId, "APPROVED")}
                                disabled={!!processing}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold hover:bg-emerald-100 transition-all disabled:opacity-40"
                              >
                                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                <span className="hidden sm:inline">Approve</span>
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(leaveId, "REJECTED")}
                                disabled={!!processing}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-[12px] font-semibold hover:bg-red-100 transition-all disabled:opacity-40"
                              >
                                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                                <span className="hidden sm:inline">Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                        </td>
                      )}

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;