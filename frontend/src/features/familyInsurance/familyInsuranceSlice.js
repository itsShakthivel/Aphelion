import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyInsuranceAPI from "../../api/familyInsuranceAPI";

// ============================================
// Async Thunks
// ============================================

export const createFamilyInsurance =
createAsyncThunk(

    "familyInsurance/create",

    async (

        {

            familyId,

            treasuryId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyInsuranceAPI.createFamilyInsurance(

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

export const fetchFamilyInsurancePolicies =
createAsyncThunk(

    "familyInsurance/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await familyInsuranceAPI.getFamilyInsurancePolicies(

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

export const updateFamilyInsurance =
createAsyncThunk(

    "familyInsurance/update",

    async (

        {

            policyId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyInsuranceAPI.updateFamilyInsurance(

                policyId,

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

export const deleteFamilyInsurance =
createAsyncThunk(

    "familyInsurance/delete",

    async (

        policyId,

        thunkAPI

    ) => {

        try {

            return await familyInsuranceAPI.deleteFamilyInsurance(

                policyId

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

    policies: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyInsuranceSlice =
createSlice({

    name: "familyInsurance",

    initialState,

    reducers: {

        resetFamilyInsuranceState:
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

                        "familyInsurance/"

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

                        "familyInsurance/"

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

                        state.policies =

                            action.payload.data;

                    }

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyInsurance/"

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

    resetFamilyInsuranceState,

} = familyInsuranceSlice.actions;

export default familyInsuranceSlice.reducer;