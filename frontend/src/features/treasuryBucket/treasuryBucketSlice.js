import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as treasuryBucketAPI
    from "../../api/treasuryBucketAPI";

// ============================================
// Create Bucket
// ============================================

export const createTreasuryBucket =
createAsyncThunk(

    "treasuryBucket/create",

    async (

        {
            familyId,
            treasuryId,
            data,
        },

        thunkAPI

    ) => {

        try {

            return await treasuryBucketAPI.createTreasuryBucket(

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
// Fetch Buckets
// ============================================

export const fetchTreasuryBuckets =
createAsyncThunk(

    "treasuryBucket/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await treasuryBucketAPI.getTreasuryBuckets(

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
// Update Bucket
// ============================================

export const updateTreasuryBucket =
createAsyncThunk(

    "treasuryBucket/update",

    async (

        {
            bucketId,
            data,
        },

        thunkAPI

    ) => {

        try {

            return await treasuryBucketAPI.updateTreasuryBucket(

                bucketId,

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
// Archive Bucket
// ============================================

export const archiveTreasuryBucket =
createAsyncThunk(

    "treasuryBucket/archive",

    async (

        bucketId,

        thunkAPI

    ) => {

        try {

            return await treasuryBucketAPI.archiveTreasuryBucket(

                bucketId

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

    buckets: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const treasuryBucketSlice =
createSlice({

    name: "treasuryBucket",

    initialState,

    reducers: {

        resetTreasuryBucketState:
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

                        "treasuryBucket/"

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

                        "treasuryBucket/"

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

                        state.buckets =

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

                        "treasuryBucket/"

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

    resetTreasuryBucketState,

} = treasuryBucketSlice.actions;

export default treasuryBucketSlice.reducer;