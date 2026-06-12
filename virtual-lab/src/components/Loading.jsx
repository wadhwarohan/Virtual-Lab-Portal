const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-6">

      {/* Spinner stack */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-indigo-100" />
        {/* Spinning ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-300 animate-spin" />
        {/* Inner pulse dot */}
        <div className="w-6 h-6 rounded-full bg-indigo-500 animate-pulse" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-700 tracking-wide">Loading</p>
        <p className="text-xs text-slate-400 mt-1">Please wait a moment...</p>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

    </div>
  );
};

export default Loading;