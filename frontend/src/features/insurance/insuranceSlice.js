import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getInsurances,
    createInsurance,
    updateInsurance,
    deleteInsurance,
} from "../../api/insuranceAPI";

// ==========================
// Fetch Insurance
// ==========================

export const fetchInsurances = createAsyncThunk(
    "insurance/fetchInsurances",
    async (_, thunkAPI) => {

        try {

            const response =
                await getInsurances();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch insurance"

            );

        }

    }
);

// ==========================
// Add Insurance
// ==========================

export const addInsurance = createAsyncThunk(
    "insurance/addInsurance",
    async (data, thunkAPI) => {

        try {

            const response =
                await createInsurance(data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to add insurance"

            );

        }

    }
);

// ==========================
// Update Insurance
// ==========================

export const editInsurance = createAsyncThunk(
    "insurance/editInsurance",
    async ({ id, data }, thunkAPI) => {

        try {

            const response =
                await updateInsurance(id, data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to update insurance"

            );

        }

    }
);

// ==========================
// Delete Insurance
// ==========================

export const removeInsurance = createAsyncThunk(
    "insurance/removeInsurance",
    async (id, thunkAPI) => {

        try {

            await deleteInsurance(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to delete insurance"

            );

        }

    }
);

const initialState = {

    insurances: [],

    loading: false,

    error: null,

};

const insuranceSlice = createSlice({

    name: "insurance",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

        // Fetch

        .addCase(fetchInsurances.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchInsurances.fulfilled, (state, action) => {

            state.loading = false;

            state.insurances = action.payload;

        })

        .addCase(fetchInsurances.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // Add

        .addCase(addInsurance.fulfilled, (state, action) => {

            state.insurances.unshift(action.payload);

        })

        // Edit

        .addCase(editInsurance.fulfilled, (state, action) => {

            state.insurances = state.insurances.map(

                (insurance) =>

                    insurance._id === action.payload._id

                        ? action.payload

                        : insurance

            );

        })

        // Delete

        .addCase(removeInsurance.fulfilled, (state, action) => {

            state.insurances =
                state.insurances.filter(

                    (insurance) =>

                        insurance._id !== action.payload

                );

        });

    },

});

export default insuranceSlice.reducer;