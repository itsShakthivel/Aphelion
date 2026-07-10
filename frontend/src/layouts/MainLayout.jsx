import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-slate-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default MainLayout;