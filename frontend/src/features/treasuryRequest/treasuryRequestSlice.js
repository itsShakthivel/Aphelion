import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as treasuryRequestAPI
    from "../../api/treasuryRequestAPI";

// ============================================
// Create Request
// ============================================

export const createTreasuryRequest =
createAsyncThunk(

    "treasuryRequest/create",

    async (

        {

            familyId,

            treasuryId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await treasuryRequestAPI.createTreasuryRequest(

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

// ============================================
// Fetch Requests
// ============================================

export const fetchTreasuryRequests =
createAsyncThunk(

    "treasuryRequest/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await treasuryRequestAPI.getTreasuryRequests(

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

// ============================================
// Approve Request
// ============================================

export const approveTreasuryRequest =
createAsyncThunk(

    "treasuryRequest/approve",

    async (

        requestId,

        thunkAPI

    ) => {

        try {

            return await treasuryRequestAPI.approveTreasuryRequest(

                requestId

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
// Reject Request
// ============================================

export const rejectTreasuryRequest =
createAsyncThunk(

    "treasuryRequest/reject",

    async (

        {

            requestId,

            rejectionReason,

        },

        thunkAPI

    ) => {

        try {

            return await treasuryRequestAPI.rejectTreasuryRequest(

                requestId,

                rejectionReason

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

    requests: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const treasuryRequestSlice =
createSlice({

    name: "treasuryRequest",

    initialState,

    reducers: {

        resetTreasuryRequestState:
        state => {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: builder => {

        builder

            // ====================================
            // Pending
            // ====================================

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "treasuryRequest/"

                    ) &&

                    action.type.endsWith(

                        "/pending"

                    ),

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            // ====================================
            // Fulfilled
            // ====================================

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "treasuryRequest/"

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

                        state.requests =

                            action.payload.data;

                    }

                }

            )

            // ====================================
            // Rejected
            // ====================================

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "treasuryRequest/"

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

    resetTreasuryRequestState,

} = treasuryRequestSlice.actions;

export default treasuryRequestSlice.reducer;