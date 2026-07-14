import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getLoans,
    createLoan,
    updateLoan,
    deleteLoan,
} from "../../api/loanAPI";

// ==========================
// Fetch Loans
// ==========================

export const fetchLoans = createAsyncThunk(
    "loan/fetchLoans",
    async (_, thunkAPI) => {
        try {
            const response = await getLoans();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch loans"
            );
        }
    }
);

// ==========================
// Add Loan
// ==========================

export const addLoan = createAsyncThunk(
    "loan/addLoan",
    async (data, thunkAPI) => {
        try {
            const response =
                await createLoan(data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to add loan"
            );

        }
    }
);

// ==========================
// Edit Loan
// ==========================

export const editLoan = createAsyncThunk(
    "loan/editLoan",
    async ({ id, data }, thunkAPI) => {

        try {

            const response =
                await updateLoan(id, data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update loan"
            );

        }

    }
);

// ==========================
// Delete Loan
// ==========================

export const removeLoan = createAsyncThunk(
    "loan/removeLoan",
    async (id, thunkAPI) => {

        try {

            await deleteLoan(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete loan"
            );

        }

    }
);

const initialState = {

    loans: [],

    loading: false,

    error: null,

};

const loanSlice = createSlice({

    name: "loan",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

        // Fetch

        .addCase(fetchLoans.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchLoans.fulfilled, (state, action) => {

            state.loading = false;

            state.loans = action.payload;

        })

        .addCase(fetchLoans.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // Add

        .addCase(addLoan.fulfilled, (state, action) => {

            state.loans.unshift(action.payload);

        })

        // Edit

        .addCase(editLoan.fulfilled, (state, action) => {

            state.loans = state.loans.map(

                (loan) =>

                    loan._id === action.payload._id

                        ? action.payload

                        : loan

            );

        })

        // Delete

        .addCase(removeLoan.fulfilled, (state, action) => {

            state.loans =
                state.loans.filter(

                    (loan) =>

                        loan._id !== action.payload

                );

        });

    },

});

export default loanSlice.reducer;