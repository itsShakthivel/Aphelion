import API from "./axios";

// ============================================
// Create Insurance
// ============================================

export const createFamilyInsurance = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(
        `/family-insurance/${familyId}/${treasuryId}`,
        data
    );

    return response.data;

};

// ============================================
// Get Policies
// ============================================

export const getFamilyInsurancePolicies = async (
    treasuryId
) => {

    const response = await API.get(
        `/family-insurance/${treasuryId}`
    );

    return response.data;

};

// ============================================
// Get Policy
// ============================================

export const getFamilyInsurancePolicy = async (
    policyId
) => {

    const response = await API.get(
        `/family-insurance/details/${policyId}`
    );

    return response.data;

};

// ============================================
// Update Policy
// ============================================

export const updateFamilyInsurance = async (
    policyId,
    data
) => {

    const response = await API.put(
        `/family-insurance/${policyId}`,
        data
    );

    return response.data;

};

// ============================================
// Delete Policy
// ============================================

export const deleteFamilyInsurance = async (
    policyId
) => {

    const response = await API.delete(
        `/family-insurance/${policyId}`
    );

    return response.data;

};