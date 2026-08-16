import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../../api/transactionApi";

import {
    fetchDashboard,
} from "../dashboard/dashboardSlice";

import {
    fetchOverview,
    fetchExpenseAnalytics,
    fetchMonthlyExpenseTrend,
    fetchIncomeAnalytics,
    fetchCashFlowAnalytics,
    fetchInvestmentAnalytics,
    fetchNetWorthAnalytics,
    fetchNetWorthTimeline,
    fetchFinancialHealth,
    fetchInsights,
} from "../analytics/analyticsSlice";

const refreshFinancialData = (
    dispatch
) => {

    dispatch(
        fetchDashboard()
    );

    dispatch(
        fetchOverview()
    );

    dispatch(
        fetchExpenseAnalytics()
    );

    dispatch(
        fetchMonthlyExpenseTrend()
    );

    dispatch(
        fetchIncomeAnalytics()
    );

    dispatch(
        fetchCashFlowAnalytics()
    );

    dispatch(
        fetchInvestmentAnalytics()
    );

    dispatch(
        fetchNetWorthAnalytics()
    );

    dispatch(
        fetchNetWorthTimeline()
    );

    dispatch(
        fetchFinancialHealth()
    );

    dispatch(
        fetchInsights()
    );

};

export const fetchTransactions =
    createAsyncThunk(
        "transaction/fetchTransactions",
        async (
            _,
            thunkAPI
        ) => {

            try {

                const response =
                    await getTransactions();

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }

        }
    );

export const addTransaction =
    createAsyncThunk(
        "transaction/addTransaction",
        async (
            transactionData,
            thunkAPI
        ) => {

            try {

                const response =
                    await createTransaction(
                        transactionData
                    );

                refreshFinancialData(
                    thunkAPI.dispatch
                );

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }

        }
    );

export const editTransaction =
    createAsyncThunk(
        "transaction/editTransaction",
        async (
            { id, data },
            thunkAPI
        ) => {

            try {

                const response =
                    await updateTransaction(
                        id,
                        data
                    );

                refreshFinancialData(
                    thunkAPI.dispatch
                );

                return response.data;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }

        }
    );

export const removeTransaction =
    createAsyncThunk(
        "transaction/removeTransaction",
        async (
            id,
            thunkAPI
        ) => {

            try {

                await deleteTransaction(
                    id
                );

                refreshFinancialData(
                    thunkAPI.dispatch
                );

                return id;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }

        }
    );

const initialState = {

    transactions: [],

    loading: false,

    error: null,

};

const transactionSlice =
    createSlice({

        name:
            "transaction",

        initialState,

        reducers: {},

        extraReducers:
            (builder) => {

                builder

                    .addCase(
                        fetchTransactions.pending,
                        (state) => {

                            state.loading =
                                true;

                            state.error =
                                null;

                        }
                    )

                    .addCase(
                        fetchTransactions.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.transactions =
                                action.payload;

                        }
                    )

                    .addCase(
                        fetchTransactions.rejected,
                        (
                            state,
                            action
                        ) => {

                            state.loading =
                                false;

                            state.error =
                                action.payload;

                        }
                    )

                    .addCase(
                        addTransaction.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            state.transactions.unshift(
                                action.payload
                            );

                        }
                    )

                    .addCase(
                        editTransaction.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            const index =
                                state.transactions.findIndex(
                                    (
                                        transaction
                                    ) =>
                                        transaction._id ===
                                        action.payload._id
                                );

                            if (
                                index !== -1
                            ) {

                                state.transactions[
                                    index
                                ] =
                                    action.payload;

                            }

                        }
                    )

                    .addCase(
                        removeTransaction.fulfilled,
                        (
                            state,
                            action
                        ) => {

                            state.transactions =
                                state.transactions.filter(
                                    (
                                        transaction
                                    ) =>
                                        transaction._id !==
                                        action.payload
                                );

                        }
                    );

            },

    });

export default transactionSlice.reducer;