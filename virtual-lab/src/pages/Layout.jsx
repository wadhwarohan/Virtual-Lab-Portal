import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
      
      {/* Left — sidebar */}
      <Sidebar />

      {/* Right — topbar + page content stacked vertically */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;