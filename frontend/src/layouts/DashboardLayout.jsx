import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = ({ children }) => {

    return (

        <div
            className="
                min-h-screen
                flex
            "
            style={{
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
            }}
        >

            <div className="relative z-50 shrink-0">

                <Sidebar />

            </div>

            <div
                className="
                    flex-1
                    flex
                    flex-col
                    min-h-screen
                    min-w-0
                "
            >

                <div className="relative z-50 shrink-0">

                    <Navbar />

                </div>

                <main
                    className="
                        relative
                        z-0
                        flex-1
                        overflow-auto
                        p-6
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;