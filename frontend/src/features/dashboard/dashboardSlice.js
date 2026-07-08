import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "../../api/dashboardApi.js";

export const fetchDashboard = createAsyncThunk(

    "dashboard/fetch",

    async (_, thunkAPI) => {

        try {

            const response = await getDashboard();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Dashboard fetch failed"

            );

        }

    }

);

const initialState = {

    data: null,

    loading: false,

    error: null,

};

export const fetchDashboard = createAsyncThunk(

    "dashboard/fetch",

    async (_, thunkAPI) => {

        try {

            const response = await getDashboard();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Dashboard fetch failed"

            );

        }

    }

);