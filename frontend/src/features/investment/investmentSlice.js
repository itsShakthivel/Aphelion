import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const investmentSlice = createSlice({

    name: "investment",

    initialState,

    reducers: {},

});

export default investmentSlice.reducer;