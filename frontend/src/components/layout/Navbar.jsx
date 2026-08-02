import {
    FaSearch,
    FaChevronDown,
} from "react-icons/fa";

import NotificationBell from "../notifications/NotificationBell";

const Navbar = () => {

    return (

        <header

            className="
                h-16
                flex
                items-center
                justify-between
                px-8
                border-b
                backdrop-blur-xl
            "

            style={{

                background: "var(--surface)",

                borderColor: "var(--glass-border)",

            }}

        >

            {/* Left */}

            <div>

                <h2

                    className="text-lg font-semibold"

                    style={{

                        color: "var(--text-primary)",

                    }}

                >

                    Good Evening, Shakthivel 👋

                </h2>

                <p

                    className="text-sm"

                    style={{

                        color: "var(--text-secondary)",

                    }}

                >

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
                        flex
                        items-center
                        gap-3
                        px-4
                        py-2
                        rounded-xl
                    "

                    style={{

                        background: "var(--surface-hover)",

                        border: "1px solid var(--glass-border)",

                    }}

                >

                    <FaSearch

                        style={{

                            color: "var(--text-muted)",

                        }}

                    />

                    <input

                        type="text"

                        placeholder="Search..."

                        className="
                            bg-transparent
                            outline-none
                            w-48
                        "

                        style={{

                            color: "var(--text-primary)",

                        }}

                    />

                </div>

                {/* Notifications */}

                <NotificationBell />

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
                            flex
                            items-center
                            justify-center
                            font-bold
                        "

                        style={{

                            background: "var(--primary)",

                            color: "#ffffff",

                        }}

                    >

                        S

                    </div>

                    <FaChevronDown

                        style={{

                            color: "var(--text-primary)",

                        }}

                    />

                </div>

            </div>

        </header>

    );

};

export default Navbar;