import API from "./axios";

// ============================================
// Create Request
// ============================================

export const createTreasuryRequest = async (

    familyId,

    treasuryId,

    data

) => {

    const response = await API.post(

        `/treasury-requests/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Requests
// ============================================

export const getTreasuryRequests = async (

    treasuryId

) => {

    const response = await API.get(

        `/treasury-requests/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Request
// ============================================

export const getTreasuryRequest = async (

    requestId

) => {

    const response = await API.get(

        `/treasury-requests/details/${requestId}`

    );

    return response.data;

};

// ============================================
// Approve Request
// ============================================

export const approveTreasuryRequest = async (

    requestId

) => {

    const response = await API.put(

        `/treasury-requests/${requestId}/approve`

    );

    return response.data;

};

// ============================================
// Reject Request
// ============================================

export const rejectTreasuryRequest = async (

    requestId,

    rejectionReason

) => {

    const response = await API.put(

        `/treasury-requests/${requestId}/reject`,

        {

            rejectionReason,

        }

    );

    return response.data;

};