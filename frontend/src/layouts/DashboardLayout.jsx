import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout({children}) {
    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-6 flex-1 overflow-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;