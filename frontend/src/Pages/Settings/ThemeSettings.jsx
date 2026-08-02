import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {

    setThemeMode,

} from "../../features/theme/themeSlice";

const ThemeSettings = () => {

    const dispatch = useDispatch();

    const { mode } = useSelector(

        state => state.theme

    );

    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <h1

                        className="text-3xl font-bold"

                        style={{

                            color: "var(--text-primary)",

                        }}

                    >

                        Theme Settings

                    </h1>

                    <p

                        className="mt-2"

                        style={{

                            color: "var(--text-secondary)",

                        }}

                    >

                        Personalize the appearance of Aphelion.

                    </p>

                </div>

                {/* Theme Card */}

                <div

                    className="glass rounded-3xl p-8"

                >

                    <h2

                        className="text-xl font-semibold mb-6"

                        style={{

                            color: "var(--text-primary)",

                        }}

                    >

                        Appearance

                    </h2>

                    <div className="space-y-5">

                        {/* Dark */}

                        <label

                            className="flex items-center justify-between cursor-pointer"

                        >

                            <span

                                style={{

                                    color: "var(--text-primary)",

                                }}

                            >

                                🌙 Dark Mode

                            </span>

                            <input

                                type="radio"

                                value="dark"

                                checked={mode === "dark"}

                                onChange={() =>

                                    dispatch(

                                        setThemeMode("dark")

                                    )

                                }

                            />

                        </label>

                        {/* Light */}

                        <label

                            className="flex items-center justify-between cursor-pointer"

                        >

                            <span

                                style={{

                                    color: "var(--text-primary)",

                                }}

                            >

                                ☀️ Light Mode

                            </span>

                            <input

                                type="radio"

                                value="light"

                                checked={mode === "light"}

                                onChange={() =>

                                    dispatch(

                                        setThemeMode("light")

                                    )

                                }

                            />

                        </label>

                        {/* System */}

                        <label

                            className="flex items-center justify-between cursor-pointer"

                        >

                            <span

                                style={{

                                    color: "var(--text-primary)",

                                }}

                            >

                                💻 System Theme

                            </span>

                            <input

                                type="radio"

                                value="system"

                                checked={mode === "system"}

                                onChange={() =>

                                    dispatch(

                                        setThemeMode("system")

                                    )

                                }

                            />

                        </label>

                    </div>

                </div>

                {/* Preview */}

                <div

                    className="glass rounded-3xl p-8 mt-8"

                >

                    <h2

                        className="text-xl font-semibold mb-5"

                        style={{

                            color: "var(--text-primary)",

                        }}

                    >

                        Theme Preview

                    </h2>

                    <div className="grid md:grid-cols-3 gap-5">

                        <div

                            className="glass rounded-2xl p-5 hover-lift"

                        >

                            <h3

                                style={{

                                    color: "var(--text-primary)",

                                }}

                            >

                                Card Preview

                            </h3>

                            <p

                                className="mt-2"

                                style={{

                                    color: "var(--text-secondary)",

                                }}

                            >

                                Glass card using your design system.

                            </p>

                        </div>

                        <div

                            className="glass rounded-2xl p-5 hover-lift"

                        >

                            <button

                                className="px-5 py-2 rounded-xl"

                                style={{

                                    background: "var(--primary)",

                                    color: "#fff",

                                }}

                            >

                                Primary Button

                            </button>

                        </div>

                        <div

                            className="glass rounded-2xl p-5 hover-lift"

                        >

                            <div

                                className="h-10 w-10 rounded-full flex items-center justify-center"

                                style={{

                                    background: "var(--primary)",

                                    color: "#fff",

                                }}

                            >

                                A

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default ThemeSettings;