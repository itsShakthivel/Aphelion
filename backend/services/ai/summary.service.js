export const generateAISummary = ({
    score,
    savingsRate,
    debtToIncome,
    investmentRatio,
}) => {

    const summary = [];

    // Savings

    if (savingsRate >= 30)
        summary.push(
            "You maintain an excellent savings discipline."
        );
    else
        summary.push(
            "Your savings rate has room for improvement."
        );

    // Debt

    if (debtToIncome <= 0.30)
        summary.push(
            "Your debt burden is comfortably under control."
        );
    else
        summary.push(
            "Your debt level is becoming significant."
        );

    // Investments

    if (investmentRatio >= 0.30)
        summary.push(
            "You consistently invest for long-term wealth creation."
        );
    else
        summary.push(
            "Increasing monthly investments can accelerate wealth growth."
        );

    // Score

    if (score >= 80)
        summary.push(
            "Overall financial health is excellent."
        );
    else if (score >= 60)
        summary.push(
            "Your financial position is healthy but has improvement opportunities."
        );
    else
        summary.push(
            "Several financial indicators require attention."
        );

    return summary.join(" ");
};