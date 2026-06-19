import { User, Mail, Briefcase, Save, CheckCircle2, AlertCircle, Ban } from "lucide-react";
import { useState } from "react";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded-2xl border-2 border-indigo-100 shadow-sm p-5 sm:p-6 mb-6'>

      {/* Header — same structure, new theme */}
      <h2 className='text-base font-semibold text-slate-800 mb-6 pb-4 border-b-2 border-indigo-50 flex items-center gap-2.5'>
        <div className='w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0'>
          <User className='w-4 h-4 text-indigo-500' />
        </div>
        Public Profile
      </h2>

      {/* Error */}
      {error && (
        <div className='bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border-2 border-rose-200 mb-6 flex items-start gap-3'>
          <AlertCircle className='w-4 h-4 shrink-0 mt-0.5 text-rose-500' />
          {error}
        </div>
      )}

      {/* Message */}
      {message && (
        <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm border-2 border-emerald-200 mb-6 flex items-start gap-3'>
          <CheckCircle2 className='w-4 h-4 shrink-0 mt-0.5 text-emerald-500' />
          {message}
        </div>
      )}

      <div className='space-y-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

          {/* Name */}
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>Name</label>
            <div className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200'>
              <User className='w-4 h-4 text-indigo-400 shrink-0' />
              <input
                disabled
                value={`${initialData.firstName} ${initialData.lastName}`}
                className='flex-1 bg-transparent text-sm text-slate-600 font-medium outline-none cursor-not-allowed'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>Email</label>
            <div className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200'>
              <Mail className='w-4 h-4 text-sky-400 shrink-0' />
              <input
                disabled
                value={initialData.email}
                className='flex-1 bg-transparent text-sm text-slate-600 font-medium outline-none cursor-not-allowed'
              />
            </div>
          </div>

          {/* Position */}
          <div className='sm:col-span-2'>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>Position</label>
            <div className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200'>
              <Briefcase className='w-4 h-4 text-indigo-400 shrink-0' />
              <input
                disabled
                value={initialData.position}
                className='flex-1 bg-transparent text-sm text-slate-600 font-medium outline-none cursor-not-allowed'
              />
            </div>
          </div>

        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Bio</label>
          <div className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200'>
            <textarea
              disabled={initialData.isDeleted}
              name="bio"
              defaultValue={initialData.bio || ""}
              placeholder="Write a brief bio...."
              className={`w-full bg-transparent px-3 py-2.5 text-sm outline-none resize-none rounded-xl ${initialData.isDeleted ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700'}`}
              rows={4}
            />
          </div>
          <p className='text-xs text-slate-400 mt-1.5'>This will be displayed on your profile</p>
        </div>

        {/* Footer */}
        {initialData.isDeleted ? (
          <div className='flex items-center gap-3 p-4 rounded-xl bg-rose-50 border-2 border-rose-200'>
            <div className='w-8 h-8 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0'>
              <Ban className='w-4 h-4 text-rose-500' />
            </div>
            <div>
              <p className='text-sm font-semibold text-rose-700'>Account Deactivated</p>
              <p className='text-xs text-rose-500 mt-0.5'>You can no longer update your profile</p>
            </div>
          </div>
        ) : (
          <div className='flex justify-end pt-2 border-t-2 border-indigo-50'>
            <button
              type='submit'
              disabled={loading}
              className='flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold transition-all duration-150 disabled:opacity-50 hover:shadow-md mt-3'
            >
              <Save className='w-3.5 h-3.5' />
              Save Changes
            </button>
          </div>
        )}

      </div>
    </form>
  );
};

export default ProfileForm;
