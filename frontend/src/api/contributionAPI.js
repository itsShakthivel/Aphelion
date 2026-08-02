import API from "./axios";

// ============================================
// Create Contribution
// ============================================

export const createContribution = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(
        `/contributions/${familyId}/${treasuryId}`,
        data
    );

    return response.data;

};

// ============================================
// Get Contributions
// ============================================

export const getContributions = async (
    treasuryId
) => {

    const response = await API.get(
        `/contributions/${treasuryId}`
    );

    return response.data;

};

// ============================================
// Get Contribution
// ============================================

export const getContribution = async (
    contributionId
) => {

    const response = await API.get(
        `/contributions/details/${contributionId}`
    );

    return response.data;

};

// ============================================
// Update Contribution
// ============================================

export const updateContribution = async (
    contributionId,
    data
) => {

    const response = await API.put(
        `/contributions/${contributionId}`,
        data
    );

    return response.data;

};

// ============================================
// Delete Contribution
// ============================================

export const deleteContribution = async (
    contributionId
) => {

    const response = await API.delete(
        `/contributions/${contributionId}`
    );

    return response.data;

};