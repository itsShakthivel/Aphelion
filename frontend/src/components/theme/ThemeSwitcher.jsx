import { useDispatch, useSelector } from "react-redux";

import {

    setThemeMode,

} from "../../features/theme/themeSlice";

import {

    accentThemes,

} from "../../theme/themeConfig";

const ThemeSwitcher = () => {

    const dispatch = useDispatch();

    const {

        mode,

        accentColor,

    } = useSelector(

        state => state.theme

    );

    const activeTheme =

        accentThemes[accentColor];

    return (

        <div className="space-y-4">

            <h3 className="text-lg font-semibold">

                Theme Mode

            </h3>

            <div className="flex gap-3">

                {

                    ["light", "dark", "system"].map(

                        (theme) => (

                            <button

                                key={theme}

                                onClick={() =>

                                    dispatch(

                                        setThemeMode(theme)

                                    )

                                }

                                className={`

                                    px-5

                                    py-2

                                    rounded-lg

                                    capitalize

                                    transition

                                    ${

                                        mode === theme

                                            ? `${activeTheme.primary} ${activeTheme.hover} text-white`

                                            : "bg-gray-200 dark:bg-gray-800"

                                    }

                                `}

                            >

                                {theme}

                            </button>

                        )

                    )

                }

            </div>

        </div>

    );

};

export default ThemeSwitcher;