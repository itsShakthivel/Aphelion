import {

    createSlice,

    createAsyncThunk,

} from "@reduxjs/toolkit";

import * as familyAPI from "../../api/familyService";

// ============================================
// Async Thunks
// ============================================

export const fetchFamily = createAsyncThunk(

    "family/fetchFamily",

    async (_, thunkAPI) => {

        try {

            return await familyAPI.getFamily();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const createFamily = createAsyncThunk(

    "family/createFamily",

    async (familyData, thunkAPI) => {

        try {

            return await familyAPI.createFamily(

                familyData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const updateFamily = createAsyncThunk(

    "family/updateFamily",

    async (

        { id, familyData },

        thunkAPI

    ) => {

        try {

            return await familyAPI.updateFamily(

                id,

                familyData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const deleteFamily = createAsyncThunk(

    "family/deleteFamily",

    async (id, thunkAPI) => {

        try {

            await familyAPI.deleteFamily(id);

            return id;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const fetchInvitations = createAsyncThunk(

    "family/fetchInvitations",

    async (_, thunkAPI) => {

        try {

            return await familyAPI.getPendingInvitations();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const sendInvitation = createAsyncThunk(

    "family/sendInvitation",

    async (invitationData, thunkAPI) => {

        try {

            return await familyAPI.sendInvitation(

                invitationData

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const acceptInvitation = createAsyncThunk(

    "family/acceptInvitation",

    async (id, thunkAPI) => {

        try {

            await familyAPI.acceptInvitation(id);

            return id;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const rejectInvitation = createAsyncThunk(

    "family/rejectInvitation",

    async (id, thunkAPI) => {

        try {

            await familyAPI.rejectInvitation(id);

            return id;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const removeMember = createAsyncThunk(

    "family/removeMember",

    async (

        {

            familyId,

            memberId,

        },

        thunkAPI

    ) => {

        try {

            await familyAPI.removeMember(

                familyId,

                memberId

            );

            return memberId;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

export const updateMemberRole = createAsyncThunk(

    "family/updateMemberRole",

    async (

        {

            familyId,

            memberId,

            role,

        },

        thunkAPI

    ) => {

        try {

            return await familyAPI.updateMemberRole(

                familyId,

                memberId,

                role

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                error.message

            );

        }

    }

);

// ============================================
// Initial State
// ============================================

const initialState = {

    family: null,

    invitations: [],

    loading: false,

    error: null,

};

// ============================================
// Slice
// ============================================

const familySlice = createSlice({

    name: "family",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // Fetch Family

            .addCase(

                fetchFamily.pending,

                (state) => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchFamily.fulfilled,

                (state, action) => {

                    state.loading = false;

                    state.family = action.payload;

                }

            )

            .addCase(

                fetchFamily.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            )

            // Create Family

            .addCase(

                createFamily.fulfilled,

                (state, action) => {

                    state.family = action.payload;

                }

            )

            // Update Family

            .addCase(

                updateFamily.fulfilled,

                (state, action) => {

                    state.family = action.payload;

                }

            )

            // Delete Family

            .addCase(

                deleteFamily.fulfilled,

                (state) => {

                    state.family = null;

                }

            )

            // Invitations

            .addCase(

                fetchInvitations.fulfilled,

                (state, action) => {

                    state.invitations = action.payload;

                }

            )

            .addCase(

                sendInvitation.fulfilled,

                (state, action) => {

                    state.invitations.push(

                        action.payload

                    );

                }

            )

            .addCase(

                acceptInvitation.fulfilled,

                (state, action) => {

                    state.invitations =

                        state.invitations.filter(

                            invitation =>

                                invitation._id !==

                                action.payload

                        );

                }

            )

            .addCase(

                rejectInvitation.fulfilled,

                (state, action) => {

                    state.invitations =

                        state.invitations.filter(

                            invitation =>

                                invitation._id !==

                                action.payload

                        );

                }

            )

            // Member Role Update

            .addCase(

                updateMemberRole.fulfilled,

                (state, action) => {

                    state.family =

                        action.payload.family;

                }

            )

            // Remove Member

            .addCase(

                removeMember.fulfilled,

                (state, action) => {

                    if (!state.family) return;

                    state.family.members =

                        state.family.members.filter(

                            member =>

                                member.user._id !==

                                action.payload

                        );

                }

            );

    },

});

export default familySlice.reducer;