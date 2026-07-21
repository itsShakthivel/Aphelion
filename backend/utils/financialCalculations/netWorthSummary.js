import { roundAmount } from "../analyticsUtils.js";

export const getNetWorthSummary = ({

    savings = 0,

    investmentValue = 0,

    liabilities = 0,

}) => {

    const assets =
        savings + investmentValue;

    return {

        assets: roundAmount(assets),

        liabilities: roundAmount(liabilities),

        netWorth: roundAmount(
            assets - liabilities
        ),

    };

};