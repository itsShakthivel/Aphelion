export const generateInsights = ({
    savingsRate,
    debtToIncome,
    investmentRatio,
    score,
}) => {

    const strengths = [];
    const weaknesses = [];
    const focusAreas = [];

    // Savings

    if (savingsRate >= 30)
        strengths.push("Excellent savings discipline");
    else {
        weaknesses.push("Savings rate is below the recommended level");
        focusAreas.push("Increase monthly savings");
    }

    // Debt

    if (debtToIncome <= 0.30)
        strengths.push("Debt is well managed");
    else {
        weaknesses.push("Debt burden is increasing");
        focusAreas.push("Reduce outstanding loans");
    }

    // Investments

    if (investmentRatio >= 0.30)
        strengths.push("Healthy investment habit");
    else {
        weaknesses.push("Investment allocation is too low");
        focusAreas.push("Increase monthly SIP");
    }

    // Overall

    if (score < 70)
        focusAreas.push("Improve Financial Twin Score");

    return {

        strengths,

        weaknesses,

        focusAreas,

    };

};