import API from "./axios";

// ============================================
// Create Investment
// ============================================

export const createFamilyInvestment = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(

        `/family-investments/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Investments
// ============================================

export const getFamilyInvestments = async (
    treasuryId
) => {

    const response = await API.get(

        `/family-investments/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Investment
// ============================================

export const getFamilyInvestment = async (
    investmentId
) => {

    const response = await API.get(

        `/family-investments/details/${investmentId}`

    );

    return response.data;

};

// ============================================
// Update Investment
// ============================================

export const updateFamilyInvestment = async (

    investmentId,

    data

) => {

    const response = await API.put(

        `/family-investments/${investmentId}`,

        data

    );

    return response.data;

};

// ============================================
// Delete Investment
// ============================================

export const deleteFamilyInvestment = async (

    investmentId

) => {

    const response = await API.delete(

        `/family-investments/${investmentId}`

    );

    return response.data;

};