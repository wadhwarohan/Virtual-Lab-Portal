import { useLocation,Link } from "react-router-dom";
import {dummyProfileData} from "../assets/assets";
import {useEffect,useState} from "react";
import {MenuIcon, SettingsIcon,  XIcon,LayoutGridIcon,UserIcon,CalendarIcon,FileTextIcon, ChevronRightIcon, LogOutIcon} from 'lucide-react';

const Sidebar =()=>{

    const {pathname}=useLocation();
    const [userName,setUserName]=useState("");
    const [mobileOpen,setMobileOpen]=useState(false);
    
    useEffect(()=>{
        setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
    },[])

    // Close Mobile sidebar on route change
    useEffect(()=>{
        setMobileOpen(false);
    },[pathname])

    const role= ""|| "PROJECT STAFF";
    const navItems=[
        {name:"Dashboard",href:'/dashboard',icon:LayoutGridIcon},
        role==="ADMIN" ?
        {name:"Employees",href:'/employees',icon:UserIcon}:
        {name:"Attendence",href:'/attendence',icon:CalendarIcon},
        {name:"Apply Leave",href:'/leave',icon:FileTextIcon},
        {name:"Settings",href:'/settings',icon:SettingsIcon},
    ]

    const sidebarContent = (
        <>
            {/* Brand Header */}
            <div className='px-7 pt-11 pb-5 border-b border-white/6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <UserIcon className='text-white size-7' />
                        <div>
                        <p className='font-semibold text-[16px] text-white tracking-wide'>Virtual Lab <br />Portal</p>
                        </div>
                    </div>
                    <button onClick={()=>{setMobileOpen(false)}} 
                    className='lg:hidden text-slate-400 hover:text-white p-1'>
                        <XIcon size={20}/>
                    </button>
                </div>

            </div>

            {/* section label */}
            <div className='px-5 pt-20 pb-2'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'>Navigation</p>
            </div>

            {/* Navigation List */}
            <div className='flex-1 px-3 space-y-0.5 overflow-y-auto'>
                {navItems.map((item)=>{
                    const isActive = pathname.startsWith(item.href)
                    return(
                        <Link key={item.name} to={item.href} className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${isActive?'bg-indigo-500/12 text-indigo-300':'text-slate-300 hover:text-white hover:bg-white/4'}`}>
                         {isActive && <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500'/>}
                         <item.icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400 group-hover:text-slate-300'}`} />
                         <span className='flex-1'>
                            {item.name}
                         </span>
                         {isActive && <ChevronRightIcon className='w-3.5 h-3.5 text-indigo-500/50'/>}
                        </Link>
                    )
                })}
            </div>

            
        </>
    )

    return(
        <>
          {/* Mobile Hamburger button   */}
          <button onClick={()=>setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10'>
            <MenuIcon size={20} />
          </button>

          {/* mobile Overlay */}
          {mobileOpen && <div className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40' onClick={()=>setMobileOpen(false)} />}

          {/* SideBar desktop */}
            <aside className='hidden lg:flex flex-col h-full w-[290px] bg-slate-950 text-white shrink-0 border-r border-white/4'>
                {sidebarContent}
            </aside>


            {/* sidebar mobile */}
            <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </aside>
        </>
    )
}
export default Sidebar