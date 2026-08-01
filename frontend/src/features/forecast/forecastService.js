import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as forecastAPI from "../../api/forecastService";

export const fetchForecast =
createAsyncThunk(

    "forecast/fetch",

    async (period = "1y", thunkAPI) => {

        try {

            return await forecastAPI.getForecast(period);

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

const initialState = {

    summary: null,

    forecast: [],

    insights: [],

    period: "1y",

    loading: false,

    error: null,

};

const forecastSlice = createSlice({

    name: "forecast",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchForecast.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchForecast.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.summary =
                        action.payload.summary;

                    state.forecast =
                        action.payload.forecast;

                    state.insights =
                        action.payload.insights;

                    state.period =
                        action.payload.period;

                }
            )

            .addCase(
                fetchForecast.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }
            );

    },

});

export default forecastSlice.reducer;