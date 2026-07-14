import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
} from "../../api/goalAPI";

// ==========================
// Fetch Goals
// ==========================

export const fetchGoals = createAsyncThunk(
    "goal/fetchGoals",
    async (_, thunkAPI) => {

        try {

            const response = await getGoals();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to fetch goals"

            );

        }

    }
);

// ==========================
// Add Goal
// ==========================

export const addGoal = createAsyncThunk(
    "goal/addGoal",
    async (data, thunkAPI) => {

        try {

            const response = await createGoal(data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to add goal"

            );

        }

    }
);

// ==========================
// Edit Goal
// ==========================

export const editGoal = createAsyncThunk(
    "goal/editGoal",
    async ({ id, data }, thunkAPI) => {

        try {

            const response =
                await updateGoal(id, data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to update goal"

            );

        }

    }
);

// ==========================
// Delete Goal
// ==========================

export const removeGoal = createAsyncThunk(
    "goal/removeGoal",
    async (id, thunkAPI) => {

        try {

            await deleteGoal(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Failed to delete goal"

            );

        }

    }
);

const initialState = {

    goals: [],

    loading: false,

    error: null,

};

const goalSlice = createSlice({

    name: "goal",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

        .addCase(fetchGoals.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchGoals.fulfilled, (state, action) => {

            state.loading = false;

            state.goals = action.payload;

        })

        .addCase(fetchGoals.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        .addCase(addGoal.fulfilled, (state, action) => {

            state.goals.unshift(action.payload);

        })

        .addCase(editGoal.fulfilled, (state, action) => {

            state.goals = state.goals.map((goal) =>

                goal._id === action.payload._id

                    ? action.payload

                    : goal

            );

        })

        .addCase(removeGoal.fulfilled, (state, action) => {

            state.goals = state.goals.filter(

                (goal) =>

                    goal._id !== action.payload

            );

        });

    },

});

export default goalSlice.reducer;