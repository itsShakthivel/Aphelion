import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getOverview, getExpenseAnalytics, getMonthlyExpenseTrend, getIncomeAnalytics,
} from "../../api/analyticsAPI";

export const fetchOverview = createAsyncThunk(
    "analytics/fetchOverview",
    async (_, thunkAPI) => {

        try {

            const response =
                await getOverview();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch analytics overview"

            );

        }

    }
);

export const fetchExpenseAnalytics = createAsyncThunk(
    "analytics/fetchExpenseAnalytics",
    async (params, thunkAPI) => {

        try {

            const response = await getExpenseAnalytics(params);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch expense analytics."

            );

        }

    }
);

export const fetchMonthlyExpenseTrend =
    createAsyncThunk(

        "analytics/fetchMonthlyExpenseTrend",

        async (params, thunkAPI) => {

            try {

                const response =
                    await getMonthlyExpenseTrend(params);

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to fetch monthly expense trend."

                );

            }

        }

    );

export const fetchIncomeAnalytics = createAsyncThunk(

    "analytics/fetchIncomeAnalytics",

    async (params, thunkAPI) => {

        try {

            const response =
                await getIncomeAnalytics(params);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch income analytics."

            );

        }

    }

);

const initialState = {

    overview: null,

    expenseAnalytics: [],

    monthlyExpenseTrend: [],

    incomeAnalytics: [],

    loading: false,

    error: null,

};

const analyticsSlice = createSlice({

    name: "analytics",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchOverview.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchOverview.fulfilled, (state, action) => {

                state.loading = false;

                state.overview = action.payload;

            })

            .addCase(fetchOverview.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(fetchExpenseAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchExpenseAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.expenseAnalytics = action.payload.data;
            })

            .addCase(fetchExpenseAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchMonthlyExpenseTrend.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchMonthlyExpenseTrend.fulfilled, (state, action) => {
                state.loading = false;

                state.monthlyExpenseTrend = action.payload.data;
            })

            .addCase(fetchMonthlyExpenseTrend.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })

            .addCase(fetchIncomeAnalytics.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchIncomeAnalytics.fulfilled, (state, action) => {
                state.loading = false;

                state.incomeAnalytics = action.payload.data;
            })

            .addCase(fetchIncomeAnalytics.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            })

    },

});

export default analyticsSlice.reducer;