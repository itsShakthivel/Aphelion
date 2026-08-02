import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyLoanAPI from "../../api/familyLoanAPI";

// ============================================
// Async Thunks
// ============================================

export const createFamilyLoan =
createAsyncThunk(

    "familyLoan/create",

    async (

        {

            familyId,

            treasuryId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyLoanAPI.createFamilyLoan(

                familyId,

                treasuryId,

                data

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

export const fetchFamilyLoans =
createAsyncThunk(

    "familyLoan/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await familyLoanAPI.getFamilyLoans(

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

export const updateFamilyLoan =
createAsyncThunk(

    "familyLoan/update",

    async (

        {

            loanId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyLoanAPI.updateFamilyLoan(

                loanId,

                data

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

export const deleteFamilyLoan =
createAsyncThunk(

    "familyLoan/delete",

    async (

        loanId,

        thunkAPI

    ) => {

        try {

            return await familyLoanAPI.deleteFamilyLoan(

                loanId

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

    loans: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyLoanSlice =
createSlice({

    name: "familyLoan",

    initialState,

    reducers: {

        resetFamilyLoanState:
        state => {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: builder => {

        builder

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyLoan/"

                    ) &&

                    action.type.endsWith(

                        "/pending"

                    ),

                state => {

                    state.loading = true;

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyLoan/"

                    ) &&

                    action.type.endsWith(

                        "/fulfilled"

                    ),

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.success = true;

                    if (

                        Array.isArray(

                            action.payload?.data

                        )

                    ) {

                        state.loans =

                            action.payload.data;

                    }

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyLoan/"

                    ) &&

                    action.type.endsWith(

                        "/rejected"

                    ),

                (

                    state,

                    action

                ) => {

                    state.loading = false;

                    state.success = false;

                    state.error =

                        action.payload;

                }

            );

    },

});

export const {

    resetFamilyLoanState,

} = familyLoanSlice.actions;

export default familyLoanSlice.reducer;