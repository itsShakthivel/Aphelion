import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    data: null,

    loading: false,

    error: null,

};

const goalSlice = createSlice({

    name: "goal",

    initialState,

    reducers: {},

});

export default goalSlice.reducer;