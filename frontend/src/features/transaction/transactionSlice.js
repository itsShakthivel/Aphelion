import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { fetchDashboard } from "../dashboard/dashboardSlice";
import {
    fetchOverview,
    fetchExpenseAnalytics,
    fetchMonthlyExpenseTrend,
    fetchIncomeAnalytics,
    fetchCashFlowAnalytics,
} from "../analytics/analyticsSlice";
import { fetchInvestments } from "../investments/investmentSlice";
import { fetchLoans } from "../loans/loanSlice";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async (_, thunkAPI) => {
        try {
            return await transactionService.getTransactions();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch transactions"
            );
        }
    }
);

export const createTransaction = createAsyncThunk(
    "transactions/createTransaction",
    async (transactionData, thunkAPI) => {
        try {
            const response =
                await transactionService.createTransaction(
                    transactionData
                );

            await Promise.all([
                thunkAPI.dispatch(fetchDashboard()).unwrap(),
                thunkAPI.dispatch(fetchInvestments()).unwrap(),
                thunkAPI.dispatch(fetchLoans()).unwrap(),
                thunkAPI.dispatch(fetchOverview()).unwrap(),
                thunkAPI.dispatch(fetchExpenseAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchMonthlyExpenseTrend()).unwrap(),
                thunkAPI.dispatch(fetchIncomeAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchCashFlowAnalytics()).unwrap(),
            ]);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to create transaction"
            );
        }
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async ({ id, transactionData }, thunkAPI) => {
        try {
            const response =
                await transactionService.updateTransaction(
                    id,
                    transactionData
                );

            await Promise.all([
                thunkAPI.dispatch(fetchDashboard()).unwrap(),
                thunkAPI.dispatch(fetchInvestments()).unwrap(),
                thunkAPI.dispatch(fetchLoans()).unwrap(),
                thunkAPI.dispatch(fetchOverview()).unwrap(),
                thunkAPI.dispatch(fetchExpenseAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchMonthlyExpenseTrend()).unwrap(),
                thunkAPI.dispatch(fetchIncomeAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchCashFlowAnalytics()).unwrap(),
            ]);

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to update transaction"
            );
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id, thunkAPI) => {
        try {
            await transactionService.deleteTransaction(id);

            await Promise.all([
                thunkAPI.dispatch(fetchDashboard()).unwrap(),
                thunkAPI.dispatch(fetchInvestments()).unwrap(),
                thunkAPI.dispatch(fetchLoans()).unwrap(),
                thunkAPI.dispatch(fetchOverview()).unwrap(),
                thunkAPI.dispatch(fetchExpenseAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchMonthlyExpenseTrend()).unwrap(),
                thunkAPI.dispatch(fetchIncomeAnalytics()).unwrap(),
                thunkAPI.dispatch(fetchCashFlowAnalytics()).unwrap(),
            ]);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete transaction"
            );
        }
    }
);

const initialState = {
    transactions: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        clearTransactionError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTransactions.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.transactions = action.payload;
                }
            )
            .addCase(
                fetchTransactions.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createTransaction.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.transactions.unshift(action.payload);
                }
            )
            .addCase(
                createTransaction.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateTransaction.fulfilled,
                (state, action) => {
                    state.loading = false;

                    const index =
                        state.transactions.findIndex(
                            (transaction) =>
                                transaction._id ===
                                action.payload._id
                        );

                    if (index !== -1) {
                        state.transactions[index] =
                            action.payload;
                    }
                }
            )
            .addCase(
                updateTransaction.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteTransaction.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.transactions =
                        state.transactions.filter(
                            (transaction) =>
                                transaction._id !==
                                action.payload
                        );
                }
            )
            .addCase(
                deleteTransaction.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const {
    clearTransactionError,
} = transactionSlice.actions;

export default transactionSlice.reducer;