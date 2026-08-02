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

            <Sidebar />

            <div
                className="
                    flex-1
                    flex
                    flex-col
                    min-h-screen
                "
            >

                <Navbar />

                <main
                    className="
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