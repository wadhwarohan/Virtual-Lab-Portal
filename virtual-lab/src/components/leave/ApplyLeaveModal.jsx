import React, { useState } from 'react';
import {
  CalendarDays, FileText, Loader2, Send, X,
  ThermometerIcon, UmbrellaIcon, BriefcaseIcon,
  CheckCircle2, AlertCircle, ChevronDown
} from 'lucide-react';

const LEAVE_TYPES = [
  {
    value: 'SICK',
    label: 'Sick Leave',
    icon: ThermometerIcon,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    activeBg: 'bg-rose-500',
  },
  {
    value: 'CASUAL',
    label: 'Casual Leave',
    icon: UmbrellaIcon,
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    activeBg: 'bg-sky-500',
  },
  {
    value: 'PERSONAL',
    label: 'Personal Leave',
    icon: BriefcaseIcon,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    activeBg: 'bg-violet-500',
  },
];

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');
  const [reason, setReason]         = useState('');

  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Calculate number of days selected
  const calcDays = () => {
    if (!startDate || !endDate) return 0;
    const diff = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    return diff < 0 ? 0 : diff + 1;
  };
  const days = calcDays();

  const validate = () => {
    const e = {};
    if (!selectedType)  e.type = 'Please select a leave type';
    if (!startDate) e.startDate = 'Start date is required';
    if (!endDate)  e.endDate = 'End date is required';
    if (endDate && startDate && endDate < startDate) e.endDate = 'End date must be after start date';
    if (!reason.trim()) e.reason = 'Please provide a reason';
    if (reason.trim().length < 10) e.reason = 'Reason must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    setLoading(false);
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleClose = () => {
    setSubmitted(false);
    setSelectedType('');
    setStartDate('');
    setEndDate('');
    setReason('');
    onClose();
  };

  if (!open) return null;

  // ── Success screen ──
  if (submitted) {
    return (
      <div className='fixed inset-0 flex z-50 items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
        <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in'>
          <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <CheckCircle2 className='w-8 h-8 text-emerald-500' />
          </div>
          <h3 className='text-lg font-bold text-slate-800 mb-1'>Leave Submitted!</h3>
          <button
            onClick={handleClose}
            className='w-full py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold transition'
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  const selectedMeta = LEAVE_TYPES.find(t => t.value === selectedType);

  return (
    <div
      className='fixed inset-0 flex z-50 items-center justify-center p-4 bg-black/40 backdrop-blur-sm'
      onClick={handleClose}
    >
      <div
        className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored top strip based on selected type */}
        <div className={`h-1 w-full transition-colors duration-300 ${selectedMeta ? selectedMeta.activeBg : 'bg-[#1e3a8a]'}`} />

        {/* Header */}
        <div className='flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-100'>
          <div>
            <h2 className='text-[17px] font-bold text-slate-800'>Apply for Leave</h2>
            <p className='text-xs text-slate-400 mt-0.5'>Fill in the details below to submit your request</p>
          </div>
          <button
            onClick={handleClose}
            className='p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 mt-0.5'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='px-6 py-5 space-y-5'>

          {/* Leave type — card picker */}
          <div>
            <label className='flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3'>
              <FileText className='w-4 h-4 text-slate-400' />
              Leave Type
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {LEAVE_TYPES.map((t) => (
                <button
                  key={t.value}
                  type='button'
                  onClick={() => { setSelectedType(t.value)}}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-150 ${
                    selectedType === t.value
                      ? `${t.border} ${t.bg} shadow-sm`
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedType === t.value ? t.bg : 'bg-slate-100'}`}>
                    <t.icon className={`w-4 h-4 ${selectedType === t.value ? t.color : 'text-slate-400'}`} />
                  </div>
                  <span className={`text-[11px] font-semibold leading-tight ${selectedType === t.value ? 'text-slate-800' : 'text-slate-500'}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
        <div>
        <label className='flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3'>
            <CalendarDays className='w-4 h-4 text-slate-400' />
            Duration
            <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 transition-all duration-300 ${days > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            {days} day{days !== 1 ? 's' : ''}
            </span>
        </label>

        <div className='grid grid-cols-2 gap-3'>

            {/* From date */}
            <div className='group'>
            <span className='block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider'>From</span>
            <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 bg-slate-50 transition-all duration-200 group-focus-within:bg-white group-focus-within:border-indigo-400 group-focus-within:shadow-sm ${startDate ? 'border-indigo-300 bg-white' : 'border-slate-200'}`}>
                <CalendarDays className={`w-4 h-4 shrink-0 transition-colors duration-200 ${startDate ? 'text-indigo-400' : 'text-slate-300'}`} />
                <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={minDate}
                className='flex-1 bg-transparent text-sm text-slate-700 outline-none cursor-pointer'
                />
            </div>
            {startDate && (
                <p className='text-[11px] text-indigo-400 mt-1 font-medium'>
                {new Date(startDate).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long' })}
                </p>
            )}
            </div>

            {/* To date */}
            <div className='group'>
            <span className='block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider'>To</span>
            <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 bg-slate-50 transition-all duration-200 group-focus-within:bg-white group-focus-within:border-indigo-400 group-focus-within:shadow-sm ${endDate ? 'border-indigo-300 bg-white' : 'border-slate-200'}`}>
                <CalendarDays className={`w-4 h-4 shrink-0 transition-colors duration-200 ${endDate ? 'text-indigo-400' : 'text-slate-300'}`} />
                <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || minDate}
                className='flex-1 bg-transparent text-sm text-slate-700 outline-none cursor-pointer'
                />
            </div>
            {endDate && (
                <p className='text-[11px] text-indigo-400 mt-1 font-medium'>
                {new Date(endDate).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long' })}
                </p>
            )}
            </div>

        </div>
        </div>

       {/* Reason */}
        <div className='group'>
          <label className='flex items-center justify-between text-sm font-semibold text-slate-700 mb-1.5'>
            <span>Reason</span>
            <span className={`text-xs font-normal transition-colors duration-500 ${reason.length >= 10 ? 'text-emerald-500' : 'text-slate-400'}`}>
              {reason.length} / 10 min chars
            </span>
          </label>

          <div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder='Briefly describe the reason for your leave request...'
              className='w-full bg-transparent px-3 pt-3 pb-8 text-sm text-slate-700 outline-none resize-none placeholder:text-slate-300'
            />
            <div className='absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-slate-100 overflow-hidden'>
              <div
                className={`h-full transition-all duration-500 rounded-b-xl ${reason.length >= 10 ? 'bg-emerald-400' : 'bg-indigo-300'}`}
                style={{ width: `${Math.min((reason.length / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

         

        </div>  {/* ← this closing div was MISSING — caused all 3 errors */}

        {/* Buttons */}
        <div className='flex gap-3 pt-1'>
          <button
            type='button'
            onClick={handleClose}
            className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='flex-1 py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-blue-900 text-white text-sm font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60'
          >
            {loading
              ? <><Loader2 className='animate-spin w-4 h-4' /> Submitting...</>
              : <><Send className='w-4 h-4' /> Submit Request</>
            }
          </button>
        </div>

        </form>   {/* ← form closes here, after buttons */}
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
