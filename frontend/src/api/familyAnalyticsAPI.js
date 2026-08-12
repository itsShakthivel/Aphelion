import API from "./axios";

// ============================================
// Household Analytics Overview
// ============================================

export const getFamilyAnalyticsOverview = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/overview`

    );

    return response.data;

};

// ============================================
// Contribution Trend
// ============================================

export const getContributionTrend = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/contributions`

    );

    return response.data;

};

// ============================================
// Expense Breakdown
// ============================================

export const getFamilyExpenseBreakdown = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/expenses`

    );

    return response.data;

};

// ============================================
// Treasury Growth
// ============================================

export const getTreasuryGrowth = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/treasury-growth`

    );

    return response.data;

};

// ============================================
// Goal Progress
// ============================================

export const getFamilyGoalProgress = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/goals`

    );

    return response.data;

};

// ============================================
// Investment Allocation
// ============================================

export const getFamilyInvestmentAllocation = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/investments`

    );

    return response.data;

};

// ============================================
// Debt Analysis
// ============================================

export const getFamilyDebtAnalysis = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        `/family-analytics/${familyId}/${treasuryId}/debt`

    );

    return response.data;

};