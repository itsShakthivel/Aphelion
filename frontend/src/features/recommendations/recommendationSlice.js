import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as recommendationAPI
from "../../api/recommendationService";

// ======================================
// Async Thunk
// ======================================

export const fetchRecommendations =
createAsyncThunk(

    "recommendations/fetch",

    async (_, thunkAPI) => {

        try {

            return await recommendationAPI.getRecommendations();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ======================================
// Initial State
// ======================================

const initialState = {

    recommendations: [],

    summary: {},

    loading: false,

    error: null,

};

// ======================================
// Slice
// ======================================

const recommendationSlice = createSlice({

    name: "recommendations",

    initialState,

    reducers: {

        clearRecommendations(state) {

            state.recommendations = [];

            state.summary = {};

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchRecommendations.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchRecommendations.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.recommendations =
                        action.payload.recommendations;

                    state.summary =
                        action.payload.summary;

                }
            )

            .addCase(
                fetchRecommendations.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }
            );

    },

});

export const {

    clearRecommendations,

} = recommendationSlice.actions;

export default recommendationSlice.reducer;