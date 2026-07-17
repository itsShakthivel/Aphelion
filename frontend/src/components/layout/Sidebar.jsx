import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaCog,
  FaFolderOpen,
  FaShieldAlt,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";


function Sidebar() {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      title: "Dashboard",
      icon: <FaHome />,
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
      icon: <FaShieldAlt />,
      path: "/insurance",
    },
    {
      title: "Loans",
      icon: <FaUniversity />,
      path: "/loans",
    },
    {
      title: "Goals",
      icon: <FaBullseye />,
      path: "/goals",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
    {
      title: "Analytics",
      icon: <FaChartLine />,
      path: "/analytics",
    },
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

      {/* Footer */}
      <div
        className="
          absolute
          bottom-5
          left-0
          w-full
          px-4
        "
      >
        {open && (
          <div
            className="
              bg-slate-800
              rounded-xl
              p-4
              text-center
            "
          >
            <p className="text-xs text-slate-400">
              Aphelion
            </p>

            <p className="text-sm font-bold text-emerald-400">
              v1.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;