import API from "./axios";

// ============================================
// Create Bucket
// ============================================

export const createTreasuryBucket = async (

    familyId,

    treasuryId,

    data

) => {

    const response = await API.post(

        `/treasury-buckets/${familyId}/${treasuryId}`,

        data

    );

    return response.data;

};

// ============================================
// Get Buckets
// ============================================

export const getTreasuryBuckets = async (

    treasuryId

) => {

    const response = await API.get(

        `/treasury-buckets/${treasuryId}`

    );

    return response.data;

};

// ============================================
// Get Bucket
// ============================================

export const getTreasuryBucket = async (

    bucketId

) => {

    const response = await API.get(

        `/treasury-buckets/details/${bucketId}`

    );

    return response.data;

};

// ============================================
// Update Bucket
// ============================================

export const updateTreasuryBucket = async (

    bucketId,

    data

) => {

    const response = await API.put(

        `/treasury-buckets/${bucketId}`,

        data

    );

    return response.data;

};

// ============================================
// Archive Bucket
// ============================================

export const archiveTreasuryBucket = async (

    bucketId

) => {

    const response = await API.delete(

        `/treasury-buckets/${bucketId}`

    );

    return response.data;

};