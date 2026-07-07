import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const categorySlice = createSlice({

    name: "category",

    initialState,

    reducers: {},

});

export default categorySlice.reducer;