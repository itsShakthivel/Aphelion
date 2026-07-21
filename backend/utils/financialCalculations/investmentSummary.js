import { roundAmount } from "../analyticsUtils.js";

export const getInvestmentSummary = (
    investments = []
) => {

    const totalInvested = investments.reduce(

        (sum, investment) =>

            sum + investment.investedAmount,

        0

    );

    const currentValue = investments.reduce(

        (sum, investment) =>

            sum + investment.currentValue,

        0

    );

    return {

        totalInvested: roundAmount(totalInvested),

        currentValue: roundAmount(currentValue),

        gainLoss: roundAmount(
            currentValue - totalInvested
        ),

        totalMonthlyContribution:
            roundAmount(

                investments.reduce(

                    (sum, investment) =>

                        sum +
                        (investment.monthlyContribution || 0),

                    0

                )

            ),

    };

};