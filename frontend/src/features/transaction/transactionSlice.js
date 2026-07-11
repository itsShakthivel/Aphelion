import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../../api/transactionApi";
import { fetchDashboard } from "../dashboard/dashboardSlice";

// ===============================
// Async Thunks
// ===============================

// Fetch All Transactions
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async (_, thunkAPI) => {
        try {
            const response = await getTransactions();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Create Transaction
export const addTransaction = createAsyncThunk(
    "transaction/addTransaction",
    async (transactionData, thunkAPI) => {
        try {
            const response = await createTransaction(transactionData);
            thunkAPI.dispatch(fetchDashboard());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Update Transaction
export const editTransaction = createAsyncThunk(
    "transaction/editTransaction",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updateTransaction(id, data);
            thunkAPI.dispatch(fetchDashboard());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Delete Transaction
export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id, thunkAPI) => {
        try {
            await deleteTransaction(id);
            thunkAPI.dispatch(fetchDashboard());
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
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
    name: "transaction",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // ===============================
            // Fetch
            // ===============================

            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })

            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // Add
            // ===============================

            .addCase(addTransaction.fulfilled, (state, action) => {
                state.transactions.unshift(action.payload);
            })

            // ===============================
            // Update
            // ===============================

            .addCase(editTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(
                    (transaction) => transaction._id === action.payload._id
                );

                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
            })

            // ===============================
            // Delete
            // ===============================

            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload
                );
            });
    },
});

export default transactionSlice.reducer;