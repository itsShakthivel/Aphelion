import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    loginUser,
    registerUser,
    getCurrentUser,
} from "../../api/authApi";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
};

// REGISTER
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await registerUser(userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);

// LOGIN
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await loginUser(userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
);

// GET PROFILE
export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, thunkAPI) => {
        try {
            const response = await getCurrentUser();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Profile fetch failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder

            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;

                localStorage.setItem(
                    "token",
                    action.payload.token
                );
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET PROFILE
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })

            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;