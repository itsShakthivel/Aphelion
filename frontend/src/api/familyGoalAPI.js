import API from "./axios";

// ============================================
// Create Goal
// ============================================

export const createFamilyGoal = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(

        `/family-goals/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Goals
// ============================================

export const getFamilyGoals = async (
    treasuryId
) => {

    const response = await API.get(

        `/family-goals/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Goal
// ============================================

export const getFamilyGoal = async (
    goalId
) => {

    const response = await API.get(

        `/family-goals/details/${goalId}`

    );

    return response.data;

};

// ============================================
// Update Goal
// ============================================

export const updateFamilyGoal = async (
    goalId,
    data
) => {

    const response = await API.put(

        `/family-goals/${goalId}`,

        data

    );

    return response.data;

};

// ============================================
// Delete Goal
// ============================================

export const deleteFamilyGoal = async (
    goalId
) => {

    const response = await API.delete(

        `/family-goals/${goalId}`

    );

    return response.data;

};