import { useState } from "react";

import {
  FaBars,
  FaHome,
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const menus = [
    {
      title: "Dashboard",
      icon: <FaHome />,
    },
    {
      title: "Expenses",
      icon: <FaWallet />,
    },
    {
      title: "Investments",
      icon: <FaChartPie />,
    },
    {
      title: "Goals",
      icon: <FaBullseye />,
    },
    {
      title: "Settings",
      icon: <FaCog />,
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
          <li
            key={menu.title}
            onClick={() => setActive(menu.title)}
            className={`
              flex
              items-center
              gap-4
              p-4
              rounded-xl
              cursor-pointer
              transition-all
              duration-200

              ${
                active === menu.title
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <span className="text-lg">
              {menu.icon}
            </span>

            {open && (
              <span className="font-medium">
                {menu.title}
              </span>
            )}
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