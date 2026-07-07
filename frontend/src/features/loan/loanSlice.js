import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const loanSlice = createSlice({

    name: "loan",

    initialState,

    reducers: {},

});

export default loanSlice.reducer;