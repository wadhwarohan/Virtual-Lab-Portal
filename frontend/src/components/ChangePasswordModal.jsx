import { Loader2, LockIcon, X } from "lucide-react";
import { useState } from "react";

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4' onClick={onClose}>

      {/* ✅ -z-10 fixes backdrop blocking buttons */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm -z-10' />

      <div
        className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent strip */}
        <div className='h-1 w-full bg-[#1e3a8a]' />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b-2 border-indigo-50">
          <h2 className='text-[15px] font-semibold text-slate-800 flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0'>
              <LockIcon className='w-4 h-4 text-indigo-500' />
            </div>
            Change Password
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Form — exact same content and logic */}
        <form className='p-6 space-y-5' onSubmit={handleSubmit}>

          {message.text && (
            <div className={`p-3 rounded-xl text-sm flex items-start gap-3 border-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Current Password
            </label>
            <input
              type='password'
              name='currentPassword'
              required
              placeholder='Enter current password'
              className='w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:shadow-sm transition-all duration-200 placeholder:text-slate-300'
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              New Password
            </label>
            <input
              type='password'
              name='newPassword'
              required
              placeholder='Enter new password'
              className='w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:shadow-sm transition-all duration-200 placeholder:text-slate-300'
            />
          </div>

          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all duration-150'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold flex justify-center items-center gap-2 transition-all duration-150 disabled:opacity-60'
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;