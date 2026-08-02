import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(
    localStorage.getItem("theme")
) || {
    mode: "dark",
};

// ============================================
// Apply Theme
// ============================================

const applyTheme = (mode) => {

    const root = document.documentElement;

    if (mode === "light") {

        root.setAttribute(
            "data-theme",
            "light"
        );

    }

    else if (mode === "dark") {

        root.removeAttribute(
            "data-theme"
        );

    }

    else {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (prefersDark) {

            root.removeAttribute(
                "data-theme"
            );

        }

        else {

            root.setAttribute(
                "data-theme",
                "light"
            );

        }

    }

    localStorage.setItem(
        "theme",
        JSON.stringify({
            mode,
        })
    );

};

// Apply saved theme on startup
applyTheme(savedTheme.mode);

// ============================================
// Slice
// ============================================

const themeSlice = createSlice({

    name: "theme",

    initialState: savedTheme,

    reducers: {

        setThemeMode: (state, action) => {

            state.mode = action.payload;

            applyTheme(action.payload);

        },

    },

});

export const {

    setThemeMode,

} = themeSlice.actions;

export default themeSlice.reducer;