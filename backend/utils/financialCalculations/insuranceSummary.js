import { roundAmount } from "../analyticsUtils.js";

export const getInsuranceSummary = (
    insurances = []
) => {

    const totalCoverage = insurances.reduce(

        (sum, insurance) =>

            sum + insurance.coverage,

        0

    );

    const totalPremium = insurances.reduce(

        (sum, insurance) =>

            sum + insurance.premium,

        0

    );

    return {

        totalPolicies: insurances.length,

        totalCoverage: roundAmount(totalCoverage),

        totalPremium: roundAmount(totalPremium),

    };

};