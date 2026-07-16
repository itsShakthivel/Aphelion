import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getOverview,
    getExpenseAnalytics,
    getMonthlyExpenseTrend,
    getIncomeAnalytics,
    getCashFlowAnalytics,
    getNetWorthAnalytics,
    getNetWorthTimeline,
} from "../../api/analyticsAPI";

/*
==========================================
Overview
==========================================
*/

export const fetchOverview = createAsyncThunk(
    "analytics/fetchOverview",
    async (_, thunkAPI) => {
        try {
            const response = await getOverview();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch analytics overview."
            );
        }
    }
);

/*
==========================================
Expense Analytics
==========================================
*/

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

/*
==========================================
Monthly Expense Trend
==========================================
*/

export const fetchMonthlyExpenseTrend = createAsyncThunk(
    "analytics/fetchMonthlyExpenseTrend",
    async (params, thunkAPI) => {
        try {
            const response = await getMonthlyExpenseTrend(params);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch monthly expense trend."
            );
        }
    }
);

/*
==========================================
Income Analytics
==========================================
*/

export const fetchIncomeAnalytics = createAsyncThunk(
    "analytics/fetchIncomeAnalytics",
    async (params, thunkAPI) => {
        try {
            const response = await getIncomeAnalytics(params);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch income analytics."
            );
        }
    }
);


export const fetchCashFlowAnalytics = createAsyncThunk(
    "analytics/fetchCashFlowAnalytics",

    async (params, thunkAPI) => {

        try {

            const response =
                await getCashFlowAnalytics(params);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch cash flow analytics."

            );

        }

    }

);

export const fetchNetWorthAnalytics = createAsyncThunk(

    "analytics/fetchNetWorthAnalytics",

    async (_, thunkAPI) => {

        try {

            const response =
                await getNetWorthAnalytics();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch net worth."

            );

        }

    }

);

export const fetchNetWorthTimeline = createAsyncThunk(

    "analytics/fetchNetWorthTimeline",

    async (_, thunkAPI) => {

        try {

            const response =
                await getNetWorthTimeline();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch net worth timeline."

            );

        }

    }

);

/*
==========================================
Initial State
==========================================
*/

const initialState = {

    overview: null,

    netWorth: null,

    netWorthTimeline: [],

    expenseAnalytics: [],

    monthlyExpenseTrend: [],

    incomeAnalytics: [],

    cashFlow: [],

    savings: [],

    investmentAnalytics: [],

    financialHealth: null,

    insights: [],

    loading: {

        overview: false,

        netWorth: false,

        netWorthTimeline: false,

        expenseAnalytics: false,

        monthlyExpenseTrend: false,

        incomeAnalytics: false,

        cashFlow: false,

        savings: false,

        investmentAnalytics: false,

        financialHealth: false,

        insights: false,

    },

    error: {

        overview: null,

        netWorth: null,

        netWorthTimeline: null,

        expenseAnalytics: null,

        monthlyExpenseTrend: null,

        incomeAnalytics: null,

        cashFlow: null,

        savings: null,

        investmentAnalytics: null,

        financialHealth: null,

        insights: null,

    },

};

/*
==========================================
Slice
==========================================
*/

const analyticsSlice = createSlice({

    name: "analytics",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            /*
            ==========================================
            Overview
            ==========================================
            */

            .addCase(fetchOverview.pending, (state) => {

                state.loading.overview = true;
                state.error.overview = null;

            })

            .addCase(fetchOverview.fulfilled, (state, action) => {

                state.loading.overview = false;
                state.overview = action.payload.data;

            })

            .addCase(fetchOverview.rejected, (state, action) => {

                state.loading.overview = false;
                state.error.overview = action.payload;

            })

            /*
            ==========================================
            Expense Analytics
            ==========================================
            */

            .addCase(fetchExpenseAnalytics.pending, (state) => {

                state.loading.expenseAnalytics = true;
                state.error.expenseAnalytics = null;

            })

            .addCase(fetchExpenseAnalytics.fulfilled, (state, action) => {

                state.loading.expenseAnalytics = false;
                state.expenseAnalytics = action.payload.data;

            })

            .addCase(fetchExpenseAnalytics.rejected, (state, action) => {

                state.loading.expenseAnalytics = false;
                state.error.expenseAnalytics = action.payload;

            })

            /*
            ==========================================
            Monthly Expense Trend
            ==========================================
            */

            .addCase(fetchMonthlyExpenseTrend.pending, (state) => {

                state.loading.monthlyExpenseTrend = true;
                state.error.monthlyExpenseTrend = null;

            })

            .addCase(fetchMonthlyExpenseTrend.fulfilled, (state, action) => {

                state.loading.monthlyExpenseTrend = false;
                state.monthlyExpenseTrend = action.payload.data;

            })

            .addCase(fetchMonthlyExpenseTrend.rejected, (state, action) => {

                state.loading.monthlyExpenseTrend = false;
                state.error.monthlyExpenseTrend = action.payload;

            })

            /*
            ==========================================
            Income Analytics
            ==========================================
            */

            .addCase(fetchIncomeAnalytics.pending, (state) => {

                state.loading.incomeAnalytics = true;
                state.error.incomeAnalytics = null;

            })

            .addCase(fetchIncomeAnalytics.fulfilled, (state, action) => {

                state.loading.incomeAnalytics = false;
                state.incomeAnalytics = action.payload.data;

            })

            .addCase(fetchIncomeAnalytics.rejected, (state, action) => {

                state.loading.incomeAnalytics = false;
                state.error.incomeAnalytics = action.payload;

            })

            .addCase(fetchCashFlowAnalytics.pending, (state) => {
                state.loading.cashFlow = true;

                state.error.cashFlow = null;
            })

            .addCase(fetchCashFlowAnalytics.fulfilled, (state, action) => {
                state.loading.cashFlow = false;

                state.cashFlow = action.payload.data;
            })

            .addCase(fetchCashFlowAnalytics.rejected, (state, action) => {
                state.loading.cashFlow = false;

                state.error.cashFlow = action.payload;
            })

            .addCase(fetchNetWorthAnalytics.pending, (state) => {
                state.loading.netWorth = true;

                state.error.netWorth = null;
            })

            .addCase(fetchNetWorthAnalytics.fulfilled, (state, action) => {
                state.loading.netWorth = false;

                state.netWorth = action.payload.data;
            })

            .addCase(fetchNetWorthAnalytics.rejected, (state, action) => {

                state.loading.netWorth = false;

                state.error.netWorth = action.payload;
            })

            .addCase(fetchNetWorthTimeline.pending, (state) => {
                state.loading.netWorthTimeline = true;

                state.error.netWorthTimeline = null;
            })

            .addCase(fetchNetWorthTimeline.fulfilled, (state, action) => {
                state.loading.netWorthTimeline = false;

                state.netWorthTimeline = action.payload.data;
            })

            .addCase(fetchNetWorthTimeline.rejected, (state, action) => {
                state.loading.netWorthTimeline = false;

                state.error.netWorthTimeline = action.payload;
            })

    },

});

export default analyticsSlice.reducer;