import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "../../api/dashboardApi.js";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetch",

    async (_, thunkAPI) => {
        try {

            const response = await getDashboard();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Dashboard fetch failed"
            );

        }
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchDashboard.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {

                state.loading = false;
                state.data = action.payload;

            })

            .addCase(fetchDashboard.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            });

    },
});

export default dashboardSlice.reducer;