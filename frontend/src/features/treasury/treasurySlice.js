import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as treasuryAPI from "../../api/treasuryAPI";

// ============================================
// Async Thunks
// ============================================

export const createTreasury = createAsyncThunk(
    "treasury/createTreasury",
    async (familyId, thunkAPI) => {
        try {
            return await treasuryAPI.createTreasury(
                familyId
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

export const fetchTreasury = createAsyncThunk(
    "treasury/fetchTreasury",
    async (familyId, thunkAPI) => {
        try {
            return await treasuryAPI.getTreasury(
                familyId
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

export const updateTreasury = createAsyncThunk(
    "treasury/updateTreasury",
    async ({ treasuryId, data }, thunkAPI) => {
        try {
            return await treasuryAPI.updateTreasury(
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

export const archiveTreasury = createAsyncThunk(
    "treasury/archiveTreasury",
    async (treasuryId, thunkAPI) => {
        try {
            return await treasuryAPI.archiveTreasury(
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

export const createBucket = createAsyncThunk(
    "treasury/createBucket",
    async (
        { familyId, treasuryId, data },
        thunkAPI
    ) => {
        try {
            return await treasuryAPI.createBucket(
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

export const fetchBuckets = createAsyncThunk(
    "treasury/fetchBuckets",
    async (treasuryId, thunkAPI) => {
        try {
            return await treasuryAPI.getBuckets(
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

export const updateBucket = createAsyncThunk(
    "treasury/updateBucket",
    async (
        { bucketId, data },
        thunkAPI
    ) => {
        try {
            return await treasuryAPI.updateBucket(
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

export const archiveBucket = createAsyncThunk(
    "treasury/archiveBucket",
    async (bucketId, thunkAPI) => {
        try {
            return await treasuryAPI.archiveBucket(
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

    treasury: null,

    buckets: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const treasurySlice = createSlice({

    name: "treasury",

    initialState,

    reducers: {

        resetTreasuryState: (state) => {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

            // Pending
            .addMatcher(

                (action) =>
                    action.type.startsWith("treasury/") &&
                    action.type.endsWith("/pending"),

                (state) => {

                    state.loading = true;

                    state.error = null;

                    state.success = false;

                }

            )

            // Fulfilled
            .addMatcher(

                (action) =>
                    action.type.startsWith("treasury/") &&
                    action.type.endsWith("/fulfilled"),

                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    if (action.payload?.data?.family) {

                        state.treasury =
                            action.payload.data;

                    }

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

            // Rejected
            .addMatcher(

                (action) =>
                    action.type.startsWith("treasury/") &&
                    action.type.endsWith("/rejected"),

                (state, action) => {

                    state.loading = false;

                    state.success = false;

                    state.error =
                        action.payload;

                }

            );

    },

});

export const {

    resetTreasuryState,

} = treasurySlice.actions;

export default treasurySlice.reducer;