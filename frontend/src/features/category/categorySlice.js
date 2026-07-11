import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../api/categoryApi.js";

// ==========================
// Fetch Categories
// ==========================

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, thunkAPI) => {
        try {

            const response = await getCategories();

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );

        }
    }
);

// ==========================
// Add Category
// ==========================

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (data, thunkAPI) => {

        try {

            const response =
                await createCategory(data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to add category"
            );

        }

    }
);

// ==========================
// Update Category
// ==========================

export const editCategory = createAsyncThunk(
    "category/editCategory",
    async ({ id, data }, thunkAPI) => {

        try {

            const response =
                await updateCategory(id, data);

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update category"
            );

        }

    }
);

// ==========================
// Delete Category
// ==========================

export const removeCategory = createAsyncThunk(
    "category/removeCategory",
    async (id, thunkAPI) => {

        try {

            await deleteCategory(id);

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    }
);

const initialState = {

    categories: [],

    loading: false,

    error: null,

};

const categorySlice = createSlice({

    name: "category",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

        // Fetch Categories

        .addCase(fetchCategories.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchCategories.fulfilled, (state, action) => {

            state.loading = false;

            state.categories = action.payload;

        })

        .addCase(fetchCategories.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // Add Category

        .addCase(addCategory.fulfilled, (state, action) => {

            state.categories.unshift(action.payload);

        })

        // Update Category

        .addCase(editCategory.fulfilled, (state, action) => {

            state.categories = state.categories.map((category) =>

                category._id === action.payload._id

                    ? action.payload

                    : category

            );

        })

        // Delete Category

        .addCase(removeCategory.fulfilled, (state, action) => {

            state.categories = state.categories.filter(

                (category) =>

                    category._id !== action.payload

            );

        });

    },

});

export default categorySlice.reducer;