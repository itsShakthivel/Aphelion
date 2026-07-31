import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    downloadPDFReport,
    downloadCSVReport,
} from "../../api/reportAPI";

export const downloadPDF = createAsyncThunk(

    "reports/downloadPDF",

    async (params = {}, thunkAPI) => {

        try {

            const response =
                await downloadPDFReport(params);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const downloadCSV = createAsyncThunk(

    "reports/downloadCSV",

    async (params = {}, thunkAPI) => {

        try {

            const response =
                await downloadCSVReport(params);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

const initialState = {

    loading: false,

    error: null,

};

const reportSlice = createSlice({

    name: "reports",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(

                downloadPDF.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                downloadPDF.fulfilled,

                (state) => {

                    state.loading = false;

                }

            )

            .addCase(

                downloadPDF.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            )

            .addCase(

                downloadCSV.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                downloadCSV.fulfilled,

                (state) => {

                    state.loading = false;

                }

            )

            .addCase(

                downloadCSV.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            );

    },

});

export default reportSlice.reducer;