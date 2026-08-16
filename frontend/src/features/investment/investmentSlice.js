import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";


import {
    getInvestments,
    createInvestment,
    updateInvestment,
    deleteInvestment,
    previewAngelOneImport,
    confirmAngelOneImport,
} from "../../api/investmentApi";


// ======================================================
// FETCH INVESTMENTS
// ======================================================

export const fetchInvestments =
    createAsyncThunk(

        "investment/fetchInvestments",

        async (
            _,
            thunkAPI
        ) => {

            try {

                const response =
                    await getInvestments();


                return response.data;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to fetch investments"

                );

            }

        }

    );


// ======================================================
// ADD INVESTMENT
// ======================================================

export const addInvestment =
    createAsyncThunk(

        "investment/addInvestment",

        async (
            data,
            thunkAPI
        ) => {

            try {

                const response =
                    await createInvestment(
                        data
                    );


                return response.data;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to add investment"

                );

            }

        }

    );


// ======================================================
// UPDATE INVESTMENT
// ======================================================

export const editInvestment =
    createAsyncThunk(

        "investment/editInvestment",

        async (
            {
                id,
                data,
            },
            thunkAPI
        ) => {

            try {

                const response =
                    await updateInvestment(
                        id,
                        data
                    );


                return response.data;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to update investment"

                );

            }

        }

    );


// ======================================================
// DELETE INVESTMENT
// ======================================================

export const removeInvestment =
    createAsyncThunk(

        "investment/removeInvestment",

        async (
            id,
            thunkAPI
        ) => {

            try {

                await deleteInvestment(
                    id
                );


                return id;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to delete investment"

                );

            }

        }

    );


// ======================================================
// PREVIEW ANGEL ONE XLSX
// ======================================================

export const previewInvestmentImport =
    createAsyncThunk(

        "investment/previewInvestmentImport",

        async (
            file,
            thunkAPI
        ) => {

            try {

                if (!file) {

                    return thunkAPI.rejectWithValue(

                        "Please select an Excel file."

                    );

                }


                const response =
                    await previewAngelOneImport(
                        file
                    );


                return response.data;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to preview investment import"

                );

            }

        }

    );


// ======================================================
// CONFIRM ANGEL ONE XLSX IMPORT
// ======================================================

export const confirmInvestmentImport =
    createAsyncThunk(

        "investment/confirmInvestmentImport",

        async (
            holdings,
            thunkAPI
        ) => {

            try {

                if (
                    !Array.isArray(
                        holdings
                    ) ||
                    holdings.length === 0
                ) {

                    return thunkAPI.rejectWithValue(

                        "No investment holdings available for import."

                    );

                }


                const response =
                    await confirmAngelOneImport(
                        holdings
                    );


                // ==========================================
                // REFRESH INVESTMENTS
                // ==========================================
                //
                // The confirmation endpoint returns
                // import statistics rather than the
                // complete investment list.
                //
                // Therefore fetch the latest investments
                // immediately after successful import.
                // ==========================================

                await thunkAPI.dispatch(
                    fetchInvestments()
                );


                return response.data;

            }

            catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response?.data?.message ||

                    "Failed to import investments"

                );

            }

        }

    );


// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {

    investments: [],


    // ==============================================
    // NORMAL CRUD
    // ==============================================

    loading:
        false,

    error:
        null,


    // ==============================================
    // IMPORT PREVIEW
    // ==============================================

    importPreview:
        null,

    importPreviewLoading:
        false,

    importPreviewError:
        null,


    // ==============================================
    // IMPORT CONFIRMATION
    // ==============================================

    importLoading:
        false,

    importError:
        null,

    importResult:
        null,

};


// ======================================================
// SLICE
// ======================================================

const investmentSlice =
    createSlice({

        name:
            "investment",


        initialState,


        reducers: {

            // ==========================================
            // CLEAR IMPORT PREVIEW
            // ==========================================

            clearInvestmentImportPreview: (
                state
            ) => {

                state.importPreview =
                    null;

                state.importPreviewError =
                    null;

            },


            // ==========================================
            // CLEAR IMPORT RESULT
            // ==========================================

            clearInvestmentImportResult: (
                state
            ) => {

                state.importResult =
                    null;

                state.importError =
                    null;

            },

        },


        extraReducers:
            (builder) => {

                builder


                // ==================================================
                // FETCH INVESTMENTS
                // ==================================================

                .addCase(

                    fetchInvestments.pending,

                    (
                        state
                    ) => {

                        state.loading =
                            true;

                        state.error =
                            null;

                    }

                )


                .addCase(

                    fetchInvestments.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.investments =
                            action.payload;

                    }

                )


                .addCase(

                    fetchInvestments.rejected,

                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.error =
                            action.payload;

                    }

                )


                // ==================================================
                // ADD
                // ==================================================

                .addCase(

                    addInvestment.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.investments.unshift(
                            action.payload
                        );

                    }

                )


                // ==================================================
                // EDIT
                // ==================================================

                .addCase(

                    editInvestment.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.investments =
                            state.investments.map(

                                (
                                    investment
                                ) =>

                                    investment._id ===
                                    action.payload._id

                                        ? action.payload

                                        : investment

                            );

                    }

                )


                // ==================================================
                // DELETE
                // ==================================================

                .addCase(

                    removeInvestment.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.investments =
                            state.investments.filter(

                                (
                                    investment
                                ) =>

                                    investment._id !==
                                    action.payload

                            );

                    }

                )


                // ==================================================
                // PREVIEW IMPORT
                // ==================================================

                .addCase(

                    previewInvestmentImport.pending,

                    (
                        state
                    ) => {

                        state.importPreviewLoading =
                            true;

                        state.importPreviewError =
                            null;

                        state.importPreview =
                            null;

                    }

                )


                .addCase(

                    previewInvestmentImport.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.importPreviewLoading =
                            false;

                        state.importPreview =
                            action.payload;

                    }

                )


                .addCase(

                    previewInvestmentImport.rejected,

                    (
                        state,
                        action
                    ) => {

                        state.importPreviewLoading =
                            false;

                        state.importPreviewError =
                            action.payload;

                    }

                )


                // ==================================================
                // CONFIRM IMPORT
                // ==================================================

                .addCase(

                    confirmInvestmentImport.pending,

                    (
                        state
                    ) => {

                        state.importLoading =
                            true;

                        state.importError =
                            null;

                        state.importResult =
                            null;

                    }

                )


                .addCase(

                    confirmInvestmentImport.fulfilled,

                    (
                        state,
                        action
                    ) => {

                        state.importLoading =
                            false;

                        state.importResult =
                            action.payload;

                        state.importPreview =
                            null;

                    }

                )


                .addCase(

                    confirmInvestmentImport.rejected,

                    (
                        state,
                        action
                    ) => {

                        state.importLoading =
                            false;

                        state.importError =
                            action.payload;

                    }

                );

            },

    });


export const {
    clearInvestmentImportPreview,
    clearInvestmentImportResult,
} =
    investmentSlice.actions;


export default investmentSlice.reducer;