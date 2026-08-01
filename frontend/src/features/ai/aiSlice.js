import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as aiAPI from "../../api/aiAPI";

// =======================================================
// Async Thunks
// =======================================================

export const fetchFinancialProfile = createAsyncThunk(
    "ai/profile",
    aiAPI.getFinancialProfile
);

export const fetchFinancialBehavior = createAsyncThunk(
    "ai/behavior",
    aiAPI.getFinancialBehavior
);

export const fetchSpendingPattern = createAsyncThunk(
    "ai/spending",
    aiAPI.getSpendingPattern
);

export const fetchIncomePattern = createAsyncThunk(
    "ai/income",
    aiAPI.getIncomePattern
);

export const fetchInvestmentPattern = createAsyncThunk(
    "ai/investments",
    aiAPI.getInvestmentPattern
);

export const fetchDebtPattern = createAsyncThunk(
    "ai/debt",
    aiAPI.getDebtPattern
);

export const fetchSavingsPattern = createAsyncThunk(
    "ai/savings",
    aiAPI.getSavingsPattern
);

export const fetchFinancialTwin = createAsyncThunk(
    "ai/twin",
    aiAPI.getFinancialTwin
);

// =======================================================
// Initial State
// =======================================================

const initialState = {
    profile: null,
    behavior: null,
    spending: null,
    income: null,
    investment: null,
    debt: null,
    savings: null,
    twin: null,

    loading: false,
    error: null,
};

// =======================================================
// Slice
// =======================================================

const aiSlice = createSlice({
    name: "ai",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Profile

            .addCase(fetchFinancialProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })

            // Behaviour

            .addCase(fetchFinancialBehavior.fulfilled, (state, action) => {
                state.loading = false;
                state.behavior = action.payload;
            })

            // Spending

            .addCase(fetchSpendingPattern.fulfilled, (state, action) => {
                state.loading = false;
                state.spending = action.payload;
            })

            // Income

            .addCase(fetchIncomePattern.fulfilled, (state, action) => {
                state.loading = false;
                state.income = action.payload;
            })

            // Investment

            .addCase(fetchInvestmentPattern.fulfilled, (state, action) => {
                state.loading = false;
                state.investment = action.payload;
            })

            // Debt

            .addCase(fetchDebtPattern.fulfilled, (state, action) => {
                state.loading = false;
                state.debt = action.payload;
            })

            // Savings

            .addCase(fetchSavingsPattern.fulfilled, (state, action) => {
                state.loading = false;
                state.savings = action.payload;
            })

            // Twin

            .addCase(fetchFinancialTwin.fulfilled, (state, action) => {
                state.loading = false;
                state.twin = action.payload;
            })

            // Loading

            .addMatcher(
                (action) => action.type.startsWith("ai/") && action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Rejected

            .addMatcher(
                (action) => action.type.startsWith("ai/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )
    },
});

export default aiSlice.reducer;