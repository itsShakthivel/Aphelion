import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getFIREPlanner } from "../../api/fireAPI";

const initialState = {

    planner: null,

    loading: false,

    error: null,

};

export const fetchFIREPlanner = createAsyncThunk(

    "fire/fetchFIREPlanner",

    async (params = {}, thunkAPI) => {

        try {

            const response = await getFIREPlanner(params);

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

const fireSlice = createSlice({

    name: "fire",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchFIREPlanner.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchFIREPlanner.fulfilled, (state, action) => {

                state.loading = false;

                state.planner = action.payload;

            })

            .addCase(fetchFIREPlanner.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

    },

});

export default fireSlice.reducer;