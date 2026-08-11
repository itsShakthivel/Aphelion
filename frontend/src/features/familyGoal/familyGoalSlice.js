import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyGoalAPI from "../../api/familyGoalAPI";

// ============================================
// Create Goal
// ============================================

export const createFamilyGoal =
createAsyncThunk(

    "familyGoal/create",

    async (
        {
            familyId,
            treasuryId,
            data,
        },
        thunkAPI
    ) => {

        try {

            return await familyGoalAPI.createFamilyGoal(

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
// Fetch Goals
// ============================================

export const fetchFamilyGoals =
createAsyncThunk(

    "familyGoal/fetch",

    async (
        treasuryId,
        thunkAPI
    ) => {

        try {

            return await familyGoalAPI.getFamilyGoals(

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
// Update Goal
// ============================================

export const updateFamilyGoal =
createAsyncThunk(

    "familyGoal/update",

    async (
        {
            goalId,
            data,
        },
        thunkAPI
    ) => {

        try {

            return await familyGoalAPI.updateFamilyGoal(

                goalId,

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
// Delete Goal
// ============================================

export const deleteFamilyGoal =
createAsyncThunk(

    "familyGoal/delete",

    async (
        goalId,
        thunkAPI
    ) => {

        try {

            return await familyGoalAPI.deleteFamilyGoal(

                goalId

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

    goals: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyGoalSlice =
createSlice({

    name: "familyGoal",

    initialState,

    reducers: {

        resetFamilyGoalState:
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

                        "familyGoal/"

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

                        "familyGoal/"

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

                        state.goals =

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

                        "familyGoal/"

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

    resetFamilyGoalState,

} = familyGoalSlice.actions;

export default familyGoalSlice.reducer;