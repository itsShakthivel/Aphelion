import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const insuranceSlice = createSlice({

    name: "insurance",

    initialState,

    reducers: {},

});

export default insuranceSlice.reducer;