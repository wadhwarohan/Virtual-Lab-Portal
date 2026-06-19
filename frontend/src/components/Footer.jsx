import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#1e3a8a] text-white p-4 px-6 py-3 shrink-0 ">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 ">

        <div className="flex items-center  gap-2.5">
          <p className="text-[15px] text-slate-100 font-medium">
            © 2026 | Virtual Labs Portal, IIT Roorkee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
