import {
  FaBell,
  FaSearch,
  FaChevronDown
} from "react-icons/fa";

function Navbar() {

  return (
    <header
      className="
        h-16
        bg-slate-900
        border-b
        border-slate-800
        flex
        items-center
        justify-between
        px-8
      "
    >

      {/* Left */}

      <div>

        <h2
          className="
            text-white
            font-semibold
            text-lg
          "
        >
          Good Evening, Shakthivel 👋
        </h2>

        <p className="text-slate-400 text-sm">
          Welcome back to Aphelion
        </p>

      </div>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-6
        "
      >

        {/* Search */}

        <div
          className="
            bg-slate-800
            px-4
            py-2
            rounded-xl
            flex
            items-center
            gap-2
          "
        >

          <FaSearch
            className="text-slate-400"
          />

          <input
            placeholder="Search"
            className="
              bg-transparent
              outline-none
              text-white
            "
          />

        </div>

        {/* Notification */}

        <button
          className="
            relative
            text-white
            text-xl
          "
        >

          <FaBell />

          <span
            className="
              absolute
              -top-1
              -right-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />

        </button>

        {/* Profile */}

        <div
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >

          <div
            className="
              h-10
              w-10
              rounded-full
              bg-emerald-500
              flex
              items-center
              justify-center
              font-bold
            "
          >
            S
          </div>

          <FaChevronDown
            className="text-white"
          />

        </div>

      </div>

    </header>
  );
}

export default Navbar;