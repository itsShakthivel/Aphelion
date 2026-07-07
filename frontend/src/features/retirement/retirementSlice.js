import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const retirementSlice = createSlice({

    name: "retirement",

    initialState,

    reducers: {},

});

export default retirementSlice.reducer;