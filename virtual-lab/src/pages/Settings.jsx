import { useState ,useEffect } from "react";
import { dummyProfileData } from "../assets/assets";
import Loading from "../components/Loading";
import { Lock, ShieldCheck, KeyRound  } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
const Setting =()=>{

    const [profile,setProfile] = useState(null)
    const [loading,setLoading] = useState(true)
    const [showPasswordModal,setShowPasswordModal] = useState(false)

    const fetchProfile =async () =>{
        setProfile(dummyProfileData)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }

    useEffect(()=>{
        fetchProfile()
    },[])

    if(loading) return <Loading />

    return(
        <div classname='animate-fade-in'>
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Manage your account and preferences</p>
            </div>
            
         {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile}/>}

         {/* change password trigger */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 max-w-md p-5">
                <div className="flex items-start justify-between gap-4">

                {/* Left — icon + text */}
                <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Lock className="w-4.5 h-4.5 text-indigo-500" />
                </div>
                <div>
                    <p className="font-semibold text-slate-800 text-[14px]">Password</p>
                    <p className="text-xs text-slate-400 mt-0.5">Update your account password</p>
                    {/* Last changed hint */}
                    <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Keep your account secure
                    </p>
                </div>
                

                {/* Right — button */}
                
                <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl ml-20 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-[12px] font-semibold transition-all duration-150 hover:shadow-sm shrink-0"
                >
                <KeyRound className="w-3.5 h-3.5" />
                Change
                </button>
                </div>

            </div>

            </div>
            <ChangePasswordModal open={showPasswordModal} onClose={()=> setShowPasswordModal(false)} />
        </div>
    )
}
export default Setting;