import API from "./axios";

// ============================================
// Create Family Transaction
// ============================================

export const createFamilyTransaction = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(

        `/family-transactions/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Family Transactions
// ============================================

export const getFamilyTransactions = async (
    treasuryId
) => {

    const response = await API.get(

        `/family-transactions/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Family Transaction
// ============================================

export const getFamilyTransaction = async (
    transactionId
) => {

    const response = await API.get(

        `/family-transactions/details/${transactionId}`

    );

    return response.data;

};

// ============================================
// Update Family Transaction
// ============================================

export const updateFamilyTransaction = async (

    transactionId,

    data

) => {

    const response = await API.put(

        `/family-transactions/${transactionId}`,

        data

    );

    return response.data;

};

// ============================================
// Delete Family Transaction
// ============================================

export const deleteFamilyTransaction = async (

    transactionId

) => {

    const response = await API.delete(

        `/family-transactions/${transactionId}`

    );

    return response.data;

};