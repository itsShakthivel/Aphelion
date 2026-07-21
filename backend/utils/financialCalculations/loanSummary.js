import { roundAmount } from "../analyticsUtils.js";

export const getLoanSummary = (
    loans = []
) => {

    const outstanding = loans.reduce(

        (sum, loan) =>

            sum + loan.outstandingAmount,

        0

    );

    const monthlyEMI = loans.reduce(

        (sum, loan) =>

            sum + loan.emi,

        0

    );

    return {

        outstanding: roundAmount(outstanding),

        monthlyEMI: roundAmount(monthlyEMI),

        totalLoans: loans.length,

    };

};