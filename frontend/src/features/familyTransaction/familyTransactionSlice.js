import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as familyTransactionAPI from "../../api/familyTransactionAPI";

// ============================================
// Async Thunks
// ============================================

export const createFamilyTransaction =
createAsyncThunk(

    "familyTransaction/create",

    async (

        {

            familyId,

            treasuryId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyTransactionAPI.createFamilyTransaction(

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

export const fetchFamilyTransactions =
createAsyncThunk(

    "familyTransaction/fetch",

    async (

        treasuryId,

        thunkAPI

    ) => {

        try {

            return await familyTransactionAPI.getFamilyTransactions(

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

export const updateFamilyTransaction =
createAsyncThunk(

    "familyTransaction/update",

    async (

        {

            transactionId,

            data,

        },

        thunkAPI

    ) => {

        try {

            return await familyTransactionAPI.updateFamilyTransaction(

                transactionId,

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

export const deleteFamilyTransaction =
createAsyncThunk(

    "familyTransaction/delete",

    async (

        transactionId,

        thunkAPI

    ) => {

        try {

            return await familyTransactionAPI.deleteFamilyTransaction(

                transactionId

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

    transactions: [],

    loading: false,

    success: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familyTransactionSlice =
createSlice({

    name: "familyTransaction",

    initialState,

    reducers: {

        resetFamilyTransactionState:
        state => {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: builder => {

        builder

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyTransaction/"

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

                        "familyTransaction/"

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

                        state.transactions =

                            action.payload.data;

                    }

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith(

                        "familyTransaction/"

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

    resetFamilyTransactionState,

} = familyTransactionSlice.actions;

export default familyTransactionSlice.reducer;