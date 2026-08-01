export const determineFinancialPersonality = ({
    savingsRate,
    investmentRatio,
    debtToIncome,
}) => {

    if (
        savingsRate >= 40 &&
        investmentRatio >= 0.40
    ) {
        return "The FIRE Achiever";
    }

    if (
        savingsRate >= 30 &&
        debtToIncome < 0.30
    ) {
        return "The Wealth Builder";
    }

    if (
        savingsRate >= 25
    ) {
        return "The Disciplined Saver";
    }

    if (
        investmentRatio >= 0.40
    ) {
        return "The Growth Investor";
    }

    if (
        debtToIncome > 0.70
    ) {
        return "The Risk Taker";
    }

    return "The Smart Planner";
};