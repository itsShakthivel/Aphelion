import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getInvestments,
    createInvestment,
    updateInvestment,
    deleteInvestment,
} from "../../api/investmentAPI";

// ==========================
// Fetch Investments
// ==========================

export const fetchInvestments = createAsyncThunk(
    "investment/fetchInvestments",
    async (_, thunkAPI) => {

        try {

            const response =
                await getInvestments();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch investments"

            );

        }

    }
);

// ==========================
// Add Investment
// ==========================

export const addInvestment = createAsyncThunk(
    "investment/addInvestment",
    async (data, thunkAPI) => {

        try {

            const response =
                await createInvestment(data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to add investment"

            );

        }

    }
);

// ==========================
// Update Investment
// ==========================

export const editInvestment = createAsyncThunk(
    "investment/editInvestment",
    async ({ id, data }, thunkAPI) => {

        try {

            const response =
                await updateInvestment(id, data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to update investment"

            );

        }

    }
);

// ==========================
// Delete Investment
// ==========================

export const removeInvestment = createAsyncThunk(
    "investment/removeInvestment",
    async (id, thunkAPI) => {

        try {

            await deleteInvestment(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to delete investment"

            );

        }

    }
);

const initialState = {

    investments: [],

    loading: false,

    error: null,

};

const investmentSlice = createSlice({

    name: "investment",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

        // Fetch

        .addCase(fetchInvestments.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchInvestments.fulfilled, (state, action) => {

            state.loading = false;

            state.investments = action.payload;

        })

        .addCase(fetchInvestments.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // Add

        .addCase(addInvestment.fulfilled, (state, action) => {

            state.investments.unshift(action.payload);

        })

        // Edit

        .addCase(editInvestment.fulfilled, (state, action) => {

            state.investments = state.investments.map(

                (investment) =>

                    investment._id === action.payload._id

                        ? action.payload

                        : investment

            );

        })

        // Delete

        .addCase(removeInvestment.fulfilled, (state, action) => {

            state.investments =
                state.investments.filter(

                    (investment) =>

                        investment._id !== action.payload

                );

        });

    },

});

export default investmentSlice.reducer;