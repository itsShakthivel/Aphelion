import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyInvestmentAPI from "../../api/familyInvestmentAPI";

// ============================================
// Async Thunks
// ============================================

export const createFamilyInvestment =
createAsyncThunk(

    "familyInvestment/create",

    async (

        {

            familyId,

            treasuryId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyInvestmentAPI.createFamilyInvestment(

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

export const fetchFamilyInvestments =
createAsyncThunk(

    "familyInvestment/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await familyInvestmentAPI.getFamilyInvestments(

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

export const updateFamilyInvestment =
createAsyncThunk(

    "familyInvestment/update",

    async (

        {

            investmentId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyInvestmentAPI.updateFamilyInvestment(

                investmentId,

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

export const deleteFamilyInvestment =
createAsyncThunk(

    "familyInvestment/delete",

    async (

        investmentId,

        thunkAPI

    ) => {

        try {

            return await familyInvestmentAPI.deleteFamilyInvestment(

                investmentId

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

    investments: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyInvestmentSlice =
createSlice({

    name: "familyInvestment",

    initialState,

    reducers: {

        resetFamilyInvestmentState:
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

                        "familyInvestment/"

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

                        "familyInvestment/"

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

                        state.investments =

                            action.payload.data;

                    }

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyInvestment/"

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

    resetFamilyInvestmentState,

} = familyInvestmentSlice.actions;

export default familyInvestmentSlice.reducer;