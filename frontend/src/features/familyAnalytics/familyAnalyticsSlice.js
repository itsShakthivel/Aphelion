import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyAnalyticsAPI
    from "../../api/familyAnalyticsAPI";

// ============================================
// Fetch Overview
// ============================================

export const fetchFamilyAnalyticsOverview =
createAsyncThunk(

    "familyAnalytics/fetchOverview",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getFamilyAnalyticsOverview(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Contribution Trend
// ============================================

export const fetchContributionTrend =
createAsyncThunk(

    "familyAnalytics/fetchContributionTrend",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getContributionTrend(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Expense Breakdown
// ============================================

export const fetchFamilyExpenseBreakdown =
createAsyncThunk(

    "familyAnalytics/fetchExpenseBreakdown",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getFamilyExpenseBreakdown(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Treasury Growth
// ============================================

export const fetchTreasuryGrowth =
createAsyncThunk(

    "familyAnalytics/fetchTreasuryGrowth",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getTreasuryGrowth(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Goal Progress
// ============================================

export const fetchFamilyGoalProgress =
createAsyncThunk(

    "familyAnalytics/fetchGoalProgress",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getFamilyGoalProgress(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Investment Allocation
// ============================================

export const fetchFamilyInvestmentAllocation =
createAsyncThunk(

    "familyAnalytics/fetchInvestmentAllocation",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getFamilyInvestmentAllocation(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Fetch Debt Analysis
// ============================================

export const fetchFamilyDebtAnalysis =
createAsyncThunk(

    "familyAnalytics/fetchDebtAnalysis",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            return await familyAnalyticsAPI
                .getFamilyDebtAnalysis(

                    familyId,

                    treasuryId

                );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Initial State
// ============================================

const initialState = {

    overview: null,

    contributionTrend: [],

    expenseBreakdown: [],

    treasuryGrowth: [],

    goalProgress: [],

    investmentAllocation: [],

    debtAnalysis: [],

    loading: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyAnalyticsSlice =
createSlice({

    name: "familyAnalytics",

    initialState,

    reducers: {

        resetFamilyAnalyticsState:
        state => {

            state.overview = null;

            state.contributionTrend = [];

            state.expenseBreakdown = [];

            state.treasuryGrowth = [];

            state.goalProgress = [];

            state.investmentAllocation = [];

            state.debtAnalysis = [];

            state.loading = false;

            state.error = null;

        },

    },

    extraReducers: builder => {

        builder

            // ====================================
            // Overview
            // ====================================

            .addCase(

                fetchFamilyAnalyticsOverview.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamilyAnalyticsOverview.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.overview =
                        action.payload.data;

                }

            )

            .addCase(

                fetchFamilyAnalyticsOverview.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Contribution Trend
            // ====================================

            .addCase(

                fetchContributionTrend.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchContributionTrend.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.contributionTrend =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchContributionTrend.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Expense Breakdown
            // ====================================

            .addCase(

                fetchFamilyExpenseBreakdown.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamilyExpenseBreakdown.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.expenseBreakdown =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchFamilyExpenseBreakdown.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Treasury Growth
            // ====================================

            .addCase(

                fetchTreasuryGrowth.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchTreasuryGrowth.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.treasuryGrowth =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchTreasuryGrowth.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Goal Progress
            // ====================================

            .addCase(

                fetchFamilyGoalProgress.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamilyGoalProgress.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.goalProgress =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchFamilyGoalProgress.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Investment Allocation
            // ====================================

            .addCase(

                fetchFamilyInvestmentAllocation.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamilyInvestmentAllocation.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.investmentAllocation =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchFamilyInvestmentAllocation.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            )

            // ====================================
            // Debt Analysis
            // ====================================

            .addCase(

                fetchFamilyDebtAnalysis.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamilyDebtAnalysis.fulfilled,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.debtAnalysis =
                        action.payload.data || [];

                }

            )

            .addCase(

                fetchFamilyDebtAnalysis.rejected,

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }

            );

    },

});

export const {

    resetFamilyAnalyticsState,

} = familyAnalyticsSlice.actions;

export default familyAnalyticsSlice.reducer;