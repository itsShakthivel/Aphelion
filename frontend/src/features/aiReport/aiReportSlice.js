import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as reportAPI from "../../api/aiReportAPI";

export const fetchAIReport =
createAsyncThunk(

    "aiReport/fetch",

    async (_, thunkAPI) => {

        try {

            return await reportAPI.getAIReport();

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

const initialState = {

    report: null,

    loading: false,

    error: null,

};

const aiReportSlice = createSlice({

    name: "aiReport",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchAIReport.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAIReport.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.report =
                        action.payload;

                }
            )

            .addCase(
                fetchAIReport.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    },

});

export default aiReportSlice.reducer;