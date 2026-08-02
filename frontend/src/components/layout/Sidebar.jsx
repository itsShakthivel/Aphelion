import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    FaBars,
    FaHouse,
    FaWallet,
    FaChartPie,
    FaBullseye,
    FaGear,
    FaFolderOpen,
    FaShieldHalved,
    FaBuildingColumns,
    FaChartLine,
    FaFilePdf,
    FaBell,
    FaPalette,
} from "react-icons/fa6";

import { FaRobot } from "react-icons/fa";

const Sidebar = () => {

    const [open, setOpen] = useState(true);

    const menus = [

        {
            title: "Dashboard",
            icon: <FaHouse />,
            path: "/dashboard",
        },

        {
            title: "Transactions",
            icon: <FaWallet />,
            path: "/transactions",
        },

        {
            title: "Categories",
            icon: <FaFolderOpen />,
            path: "/categories",
        },

        {
            title: "Investments",
            icon: <FaChartPie />,
            path: "/investments",
        },

        {
            title: "Insurance",
            icon: <FaShieldHalved />,
            path: "/insurance",
        },

        {
            title: "Loans",
            icon: <FaBuildingColumns />,
            path: "/loans",
        },

        {
            title: "Goals",
            icon: <FaBullseye />,
            path: "/goals",
        },

        {
            title: "Analytics",
            icon: <FaChartLine />,
            path: "/analytics",
        },

        {
            title: "Reports",
            icon: <FaFilePdf />,
            path: "/reports",
        },

        {
            title: "Recommendations",
            icon: <FaRobot />,
            path: "/recommendations",
        },

        {
            title: "Forecast",
            icon: <FaChartLine />,
            path: "/forecast",
        },

        {
            title: "Notifications",
            icon: <FaBell />,
            path: "/notifications",
        },

        {
            title: "Theme",
            icon: <FaPalette />,
            path: "/settings/theme",
        },

    ];

    return (

        <aside

            className={`
                ${open ? "w-72" : "w-20"}
                min-h-screen
                transition-all
                duration-300
                border-r
                flex
                flex-col
            `}

            style={{

                background: "var(--bg-secondary)",

                borderColor: "var(--glass-border)",

            }}

        >

            {/* Header */}

            <div

                className={`
                    flex
                    items-center
                    ${open ? "justify-between" : "justify-center"}
                    p-5
                    border-b
                `}

                style={{

                    borderColor: "var(--glass-border)",

                }}

            >

                {

                    open && (

                        <h1

                            className="text-2xl font-bold"

                            style={{

                                color: "var(--primary)",

                            }}

                        >

                            Aphelion

                        </h1>

                    )

                }

                <button

                    onClick={() => setOpen(!open)}

                    className="text-xl transition-colors"

                    style={{

                        color: "var(--text-primary)",

                    }}

                >

                    <FaBars />

                </button>

            </div>

            {/* Navigation */}

            <nav className="flex-1 mt-6 px-3">

                <ul className="space-y-2">

                    {

                        menus.map((menu) => (

                            <li key={menu.title}>

                                <NavLink

                                    to={menu.path}

                                    className={({ isActive }) => `

                                        flex

                                        items-center

                                        gap-4

                                        px-4

                                        py-3

                                        rounded-xl

                                        transition-all

                                        duration-200

                                        ${

                                            isActive

                                                ? "shadow-lg"

                                                : ""

                                        }

                                    `}

                                    style={({ isActive }) => ({

                                        background: isActive

                                            ? "var(--primary)"

                                            : "transparent",

                                        color: isActive

                                            ? "#ffffff"

                                            : "var(--text-secondary)",

                                    })}

                                >

                                    <span className="text-lg">

                                        {menu.icon}

                                    </span>

                                    {

                                        open && (

                                            <span className="font-medium">

                                                {menu.title}

                                            </span>

                                        )

                                    }

                                </NavLink>

                            </li>

                        ))

                    }

                </ul>

            </nav>

        </aside>

    );

};

export default Sidebar;