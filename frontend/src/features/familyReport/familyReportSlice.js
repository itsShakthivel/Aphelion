import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    generateFamilyPDFReport,
} from "../../api/familyReportAPI";

// ============================================
// Generate Household PDF
// ============================================

export const generateFamilyReport =
createAsyncThunk(

    "familyReport/generate",

    async (

        {
            familyId,
            treasuryId,
        },

        thunkAPI

    ) => {

        try {

            const blob =
                await generateFamilyPDFReport(

                    familyId,

                    treasuryId

                );

            return blob;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message ||

                "Failed to generate household report."

            );

        }

    }

);

// ============================================
// Initial State
// ============================================

const initialState = {

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyReportSlice =
createSlice({

    name: "familyReport",

    initialState,

    reducers: {

        resetFamilyReportState:
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

            .addCase(

                generateFamilyReport.pending,

                state => {

                    state.loading = true;

                    state.success = false;

                    state.error = null;

                }

            )

            // ====================================
            // Fulfilled
            // ====================================

            .addCase(

                generateFamilyReport.fulfilled,

                state => {

                    state.loading = false;

                    state.success = true;

                }

            )

            // ====================================
            // Rejected
            // ====================================

            .addCase(

                generateFamilyReport.rejected,

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

    resetFamilyReportState,

} = familyReportSlice.actions;

export default familyReportSlice.reducer;