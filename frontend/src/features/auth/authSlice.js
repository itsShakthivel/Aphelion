import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {},

});

export default authSlice.reducer;