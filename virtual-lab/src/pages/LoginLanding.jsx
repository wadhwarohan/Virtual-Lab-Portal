import LoginLeftSide from "../components/LoginLeftSide";
import { ShieldIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginLanding = () => {

    const portalOptions = [
        {
            to: '/login/admin',
            title: 'Admin Portal',
            description: 'Access administrative features and manage the system',
            icon: ShieldIcon
        },
        {
            to: '/login/employee',
            title: 'Employee Portal',
            description: 'Access employee features and manage your information',
            icon: UserIcon
        }
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
               <div className="w-full max-w-md animate-fade-in relative z-10">

  {/* Box wrapper */}
  <div className="bg-white rounded-2xl border-2 border-indigo-800 shadow-xl overflow-hidden">

    {/* Top accent strip */}
    <div className="h-3 w-full bg-[#1e3a8a]" />

    <div className="p-7 sm:p-8">

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-xl">🏢</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Welcome back!
        </h2>
        <p className="text-sm text-slate-400">
          Select your portal to securely access the system
        </p>
      </div>

      {/* Portals List */}
      <div className="space-y-3">
        {portalOptions.map((portal) => (
          <Link
            key={portal.to}
            to={portal.to}
            className="group flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border-2 border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-100 flex items-center justify-center transition-all duration-200 shrink-0">
                <portal.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors duration-200">
                  {portal.title}
                </h3>
                {portal.desc && (
                  <p className="text-xs text-slate-400 mt-0.5">{portal.desc}</p>
                )}
              </div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
          </Link>
        ))}
      </div>

            {/* Footer */}
            <div className="mt-7 pt-5 border-t-2 border-indigo-50 text-center text-xs text-slate-400">
                &copy; 2026 Virtual Labs · IIT Roorkee
            </div>

            </div>
        </div>
        </div>
            </div>
        </div>
    );
};

export default LoginLanding;