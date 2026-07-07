import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const transactionSlice = createSlice({

    name: "transaction",

    initialState,

    reducers: {},

});

export default transactionSlice.reducer;