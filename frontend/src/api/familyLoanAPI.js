import API from "./axios";

// ============================================
// Create Loan
// ============================================

export const createFamilyLoan = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(

        `/family-loans/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Loans
// ============================================

export const getFamilyLoans = async (
    treasuryId
) => {

    const response = await API.get(

        `/family-loans/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Loan
// ============================================

export const getFamilyLoan = async (
    loanId
) => {

    const response = await API.get(

        `/family-loans/details/${loanId}`

    );

    return response.data;

};

// ============================================
// Update Loan
// ============================================

export const updateFamilyLoan = async (
    loanId,
    data
) => {

    const response = await API.put(

        `/family-loans/${loanId}`,

        data

    );

    return response.data;

};

// ============================================
// Delete Loan
// ============================================

export const deleteFamilyLoan = async (
    loanId
) => {

    const response = await API.delete(

        `/family-loans/${loanId}`

    );

    return response.data;

};