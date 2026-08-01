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
} from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";


function Sidebar() {
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
      title: "Settings",
      icon: <FaGear />,
      path: "/settings",
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
    }
  ];

  return (
    <aside
      className={`
        bg-slate-900
        text-white
        h-screen
        transition-all
        duration-300
        border-r
        border-slate-800
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* Logo Section */}
      <div
        className={`
          flex
          items-center
          ${open ? "justify-between" : "justify-center"}
          p-5
          border-b
          border-slate-800
        `}
      >
        {open && (
          <h1 className="text-xl font-bold text-emerald-400">
            Aphelion
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="
            text-lg
            hover:text-emerald-400
            transition-colors
          "
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-6 space-y-2 px-2">
        {menus.map((menu) => (
            <li key={menu.title}>

                <NavLink
                    to = {menu.path}
                    className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-x1
                    transition-all
                    duration-200

                    ${
                        isActive
                            ? "bg-emerald-500 text-black shadow-lg"
                            : "hover:bg-slate-800"
                    }
                    `
                    }
                >
                    
                    <span className="text-lg">
                        {menu.icon}
                    </span>

                    {open && (
                        <span className="font-medium">
                            {menu.title}
                        </span>
                    )}

                </NavLink>
            </li>
        ))}
      </ul>     
    </aside>
  );
}

export default Sidebar;