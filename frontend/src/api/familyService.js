import API from "./axios";

// ============================================
// Create Family
// ============================================

export const createFamily = async (familyData) => {

    const { data } = await API.post(

        "/family",

        familyData

    );

    return data;

};

// ============================================
// Get Family
// ============================================

export const getFamily = async () => {

    const { data } = await API.get(

        "/family"

    );

    return data;

};

// ============================================
// Update Family
// ============================================

export const updateFamily = async (

    id,

    familyData

) => {

    const { data } = await API.put(

        `/family/${id}`,

        familyData

    );

    return data;

};

// ============================================
// Delete Family
// ============================================

export const deleteFamily = async (

    id

) => {

    const { data } = await API.delete(

        `/family/${id}`

    );

    return data;

};

// ============================================
// Send Invitation
// ============================================

export const sendInvitation = async (

    invitationData

) => {

    const { data } = await API.post(

        "/family/invite",

        invitationData

    );

    return data;

};

// ============================================
// Get Pending Invitations
// ============================================

export const getPendingInvitations = async () => {

    const { data } = await API.get(

        "/family/invitations"

    );

    return data;

};

// ============================================
// Accept Invitation
// ============================================

export const acceptInvitation = async (

    id

) => {

    const { data } = await API.put(

        `/family/invite/${id}/accept`

    );

    return data;

};

// ============================================
// Reject Invitation
// ============================================

export const rejectInvitation = async (

    id

) => {

    const { data } = await API.put(

        `/family/invite/${id}/reject`

    );

    return data;

};

// ============================================
// Remove Member
// ============================================

export const removeMember = async (

    familyId,

    memberId

) => {

    const { data } = await API.delete(

        `/family/${familyId}/member/${memberId}`

    );

    return data;

};

// ============================================
// Update Member Role
// ============================================

export const updateMemberRole = async (

    familyId,

    memberId,

    role

) => {

    const { data } = await API.put(

        `/family/${familyId}/member/${memberId}`,

        {

            role,

        }

    );

    return data;

};