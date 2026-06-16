import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { EyeIcon, EyeOffIcon, LockIcon,MailIcon } from "lucide-react";
import { useState } from "react";

const LoginForm = ({role,title,subtitle}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
        

    return(
        <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide/>
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white ">
                <div className="w-full max-w-md animate-fade-in">

  {/* Back link */}
  <Link
    to='/login'
    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-8 transition-colors group"
  >
    <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
    Back to portals
  </Link>

  {/* Box wrapper */}
  <div className="bg-white rounded-2xl border-2 border-indigo-800 shadow-xl overflow-hidden">

    {/* Top accent strip */}
    <div className="h-3 w-full bg-[#1e3a8a]" />

    <div className="p-7 sm:p-8">

      {/* Header */}
      <div className="mb-7">
        <div className="w-11 h-11 rounded-xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center mb-4">
          <LockIcon className="w-5 h-5 text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
        <p className="text-slate-400 text-sm mt-1.5">{subtitle}</p>
      </div>

      {/* Error */}
      {error && (
        <div className='mb-5 p-3.5 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-xl text-sm flex items-start gap-2.5'>
          <AlertCircleIcon className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          {error}
        </div>
      )}

      {/* Form — same logic */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Email */}
        <div>
          <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>
            Email Address
          </label>
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 border-slate-200 focus-within:border-indigo-400 focus-within:shadow-sm bg-white transition-all duration-200">
            <MailIcon className="w-4 h-4 text-slate-300 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='you@company.com'
              className='flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-300'
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>
            Password
          </label>
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 border-slate-200 focus-within:border-indigo-400 focus-within:shadow-sm bg-white transition-all duration-200">
            <LockIcon className="w-4 h-4 text-slate-300 shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='••••••••••'
              className='flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-300'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-slate-300 hover:text-slate-500 transition-colors'
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        {/* Submit — same logic */}
        <button
          type='submit'
          disabled={loading}
          className='w-full py-2.5 mt-1 bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold rounded-xl transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-md'
        >
          {loading && <Loader2Icon className='animate-spin h-4 w-4' />}
          Sign In
        </button>

      </form>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t-2 border-indigo-50 text-center text-xs text-slate-400">
        &copy; 2026 Virtual Labs · IIT Roorkee
      </div>

    </div>
  </div>
</div>
            </div>
        </div>
    )
}
export default LoginForm;