import API from "./axios";

// ============================================
// Treasury
// ============================================

export const createTreasury = async (
    familyId
) => {

    const response = await API.post(
        `/treasury/${familyId}`
    );

    return response.data;

};

export const getTreasury = async (
    familyId
) => {

    const response = await API.get(
        `/treasury/${familyId}`
    );

    return response.data;

};

export const updateTreasury = async (
    treasuryId,
    data
) => {

    const response = await API.put(
        `/treasury/${treasuryId}`,
        data
    );

    return response.data;

};

export const archiveTreasury = async (
    treasuryId
) => {

    const response = await API.delete(
        `/treasury/${treasuryId}`
    );

    return response.data;

};

// ============================================
// Buckets
// ============================================

export const createBucket = async (
    familyId,
    treasuryId,
    data
) => {

    const response = await API.post(
        `/treasury/${familyId}/${treasuryId}/buckets`,
        data
    );

    return response.data;

};

export const getBuckets = async (
    treasuryId
) => {

    const response = await API.get(
        `/treasury/${treasuryId}/buckets`
    );

    return response.data;

};

export const getBucket = async (
    bucketId
) => {

    const response = await API.get(
        `/treasury/bucket/${bucketId}`
    );

    return response.data;

};

export const updateBucket = async (
    bucketId,
    data
) => {

    const response = await API.put(
        `/treasury/bucket/${bucketId}`,
        data
    );

    return response.data;

};

export const archiveBucket = async (
    bucketId
) => {

    const response = await API.delete(
        `/treasury/bucket/${bucketId}`
    );

    return response.data;

};