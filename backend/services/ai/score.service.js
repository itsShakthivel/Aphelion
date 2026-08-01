export const calculateTwinScore = ({
    savingsRate = 0,
    debtToIncome = 0,
    investmentRatio = 0,
    incomeStability = "Irregular",
    goalCompletion = 0,
    insuranceRatio = 0,
    fireProgress = 0,
}) => {

    let score = 0;

    // ===============================
    // Savings (20)
    // ===============================

    if (savingsRate >= 40)
        score += 20;
    else if (savingsRate >= 30)
        score += 16;
    else if (savingsRate >= 20)
        score += 12;
    else if (savingsRate >= 10)
        score += 8;
    else
        score += 4;

    // ===============================
    // Debt (20)
    // ===============================

    if (debtToIncome <= 0.2)
        score += 20;
    else if (debtToIncome <= 0.4)
        score += 16;
    else if (debtToIncome <= 0.6)
        score += 12;
    else if (debtToIncome <= 0.8)
        score += 8;
    else
        score += 4;

    // ===============================
    // Investment (15)
    // ===============================

    if (investmentRatio >= 0.5)
        score += 15;
    else if (investmentRatio >= 0.3)
        score += 12;
    else if (investmentRatio >= 0.2)
        score += 9;
    else if (investmentRatio >= 0.1)
        score += 6;
    else
        score += 3;

    // ===============================
    // Income Stability (15)
    // ===============================

    switch (incomeStability) {

        case "Very Stable":
            score += 15;
            break;

        case "Stable":
            score += 12;
            break;

        case "Seasonal":
            score += 8;
            break;

        default:
            score += 4;
    }

    // ===============================
    // Goals (10)
    // ===============================

    score += Math.min(10, goalCompletion / 10);

    // ===============================
    // Insurance (10)
    // ===============================

    if (insuranceRatio >= 10)
        score += 10;
    else if (insuranceRatio >= 5)
        score += 8;
    else if (insuranceRatio >= 3)
        score += 6;
    else
        score += 3;

    // ===============================
    // FIRE (10)
    // ===============================

    score += Math.min(10, fireProgress);

    return Math.round(score);
};