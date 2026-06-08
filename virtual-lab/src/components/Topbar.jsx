import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LogOutIcon,LayoutGridIcon, CalendarIcon, FileTextIcon, SettingsIcon, UserIcon } from "lucide-react";
import { dummyProfileData } from "../assets/assets";

// Maps route paths to readable page titles
const PAGE_META = {
  '/dashboard':  { title: 'Dashboard',  icon: LayoutGridIcon },
  '/attendence': { title: 'Attendance', icon: CalendarIcon },
  '/leave':      { title: 'Apply Leave',      icon: FileTextIcon },
  '/employees':  { title: 'Employees',  icon: UserIcon },
  '/settings':   { title: 'Settings',   icon: SettingsIcon },
};

const Topbar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("PROJECT STAFF");

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const meta = PAGE_META[pathname] || { title: pathname.split('/').filter(Boolean).pop() || 'Dashboard', icon: LayoutGridIcon };
  const PageIcon = meta.icon;

  // Get title for current route (fallback to last segment)

  return (
   <header className='w-full h-[76px] bg-[#1e3a8a] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 shrink-0 relative'>

  {/* Left — icon + page title */}
  <div className='flex items-center gap-2.5 pl-12 lg:pl-0'>
    <div className='w-8 h-8 rounded-md bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center'>
      <PageIcon className='w-4 h-4 text-indigo-400' />
    </div>
    <h1 className='text-[17px] font-semibold text-white tracking-tight capitalize'>
      {meta.title} 
    </h1>
  </div>
   
  {/* Center — user card (absolutely centered) */}
  {userName && (
    
    <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-10 py-2 rounded-lg bg-white/5 border border-white/10'>
      <div className='w-10 h-10 rounded-md bg-slate-900 flex items-center justify-center ring-1 ring-white/10 shrink-0 mr-5'>
        <span className='text-white text-[11px] font-semibold'>
          {userName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className='leading-tight'>
        <p className='text-[15px] font-medium text-slate-200 m-'>{userName}</p>
        <p className='text-[13px] text-slate-200'>
          {role === "ADMIN" ? "Administrator" : "Project Staff"}
        </p>
      </div>
    </div>
  )}

  {/* Right — divider + logout */}
  <div className='flex items-center gap-2'>
    
    <button
      onClick={handleLogout}
      className='flex items-center gap-1.5 px-2 py-2 rounded-md text-[13px] font-medium bg-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150'
    >
      <LogOutIcon className='w-4 h-4' />
      <span className='hidden sm:inline'>Log Out</span>
    </button>
  </div>

</header>
  );
};

export default Topbar;
