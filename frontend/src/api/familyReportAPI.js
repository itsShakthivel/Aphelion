import API from "./axios";

// ============================================
// Generate Household PDF Report
// ============================================

export const generateFamilyPDFReport = async (

    familyId,

    treasuryId

) => {

    const response = await API.get(

        "/family-reports/pdf",

        {

            params: {

                familyId,

                treasuryId,

            },

            responseType: "blob",

        }

    );

    return response.data;

};