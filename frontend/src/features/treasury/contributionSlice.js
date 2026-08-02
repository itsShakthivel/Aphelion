import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as contributionAPI from "../../api/contributionAPI";

// ============================================
// Async Thunks
// ============================================

export const createContribution =
    createAsyncThunk(
        "contribution/create",
        async (
            { familyId, treasuryId, data },
            thunkAPI
        ) => {
            try {

                return await contributionAPI.createContribution(
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

export const fetchContributions =
    createAsyncThunk(
        "contribution/fetchAll",
        async (
            treasuryId,
            thunkAPI
        ) => {
            try {

                return await contributionAPI.getContributions(
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

export const updateContribution =
    createAsyncThunk(
        "contribution/update",
        async (
            { contributionId, data },
            thunkAPI
        ) => {
            try {

                return await contributionAPI.updateContribution(

                    contributionId,

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

export const deleteContribution =
    createAsyncThunk(
        "contribution/delete",
        async (
            contributionId,
            thunkAPI
        ) => {
            try {

                return await contributionAPI.deleteContribution(
                    contributionId
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
// Slice
// ============================================

const contributionSlice = createSlice({

    name: "contribution",

    initialState: {

        contributions: [],

        loading: false,

        success: false,

        error: null,

    },

    reducers: {

        resetContributionState: (
            state
        ) => {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

            .addMatcher(

                action =>

                    action.type.startsWith(
                        "contribution/"
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
                        "contribution/"
                    ) &&

                    action.type.endsWith(
                        "/fulfilled"
                    ),

                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    if (
                        Array.isArray(
                            action.payload?.data
                        )
                    ) {

                        state.contributions =
                            action.payload.data;

                    }

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(
                        "contribution/"
                    ) &&

                    action.type.endsWith(
                        "/rejected"
                    ),

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

    resetContributionState,

} = contributionSlice.actions;

export default contributionSlice.reducer;