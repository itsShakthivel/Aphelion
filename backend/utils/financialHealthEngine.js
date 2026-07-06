function calculateSavingsScore(
    totalIncome,
    totalSavings
){
    if(totalIncome === 0)
        return 0;

    const rate = (totalSavings / totalIncome) * 100;

    if(rate >= 30)
        return 20;

    if(rate >= 20)
        return 15;

    if(rate >= 10)
        return 10;

    if(rate < 10 && rate > 0)
        return 5;

    return 0;
}

function calculateInvestmentScore(
    totalIncome,
    totalInvestments
) {

    if (totalIncome === 0)
        return 0;

    const ratio =
        (totalInvestments /
         totalIncome) * 100;

    if (ratio >= 20)
        return 15;

    if (ratio >= 10)
        return 10;

    return 5;
}

function calculateInsuranceScore(
    insurances,
    annualIncome
) {

    let score = 0;

    const health =
        insurances.find(
            i => i.type === "health"
        );

    const term =
        insurances.find(
            i => i.type === "term"
        );

    // Health Insurance

    if (health) {

        if (
            health.coverageAmount >=
            1000000
        )
            score += 10;

        else if (
            health.coverageAmount >=
            500000
        )
            score += 7;
    }

    // Term Insurance

    if (term) {

        if (
            term.coverageAmount >=
            annualIncome * 15
        )
            score += 10;

        else if (
            term.coverageAmount >=
            annualIncome * 10
        )
            score += 7;
    }

    return score;
}

function calculateDebtScore(
    loans,
    monthlyIncome
) {

    if (monthlyIncome === 0)
        return 0;

    const totalEMI =
        loans.reduce(
            (sum, loan) =>
                sum + loan.emi,
            0
        );

    const ratio =
        (totalEMI /
         monthlyIncome) * 100;

    if (ratio <= 20)
        return 20;

    if (ratio <= 35)
        return 15;

    if (ratio <= 50)
        return 8;

    return 0;
}

function calculateEmergencyScore(
    totalSavings,
    totalExpense
) {

    if (
        totalSavings >=
        totalExpense * 12
    )
        return 10;

    if (
        totalSavings >=
        totalExpense * 6
    )
        return 8;

    if (
        totalSavings >=
        totalExpense * 3
    )
        return 5;

    return 2;
}

function calculateGoalScore(
    completed,
    total
) {

    if (total === 0)
        return 5;

    const percent =
        (completed / total) * 100;

    if (percent >= 80)
        return 5;

    if (percent >= 50)
        return 3;

    return 1;
}

function calculateCashFlowScore(
    income,
    expense
) {

    if (income > expense)
        return 5;

    return 0;
}

function calculateFireScore(
    retirement
) {

    if (!retirement)
        return 0;

    const progress =
        (retirement.currentCorpus /
         retirement.targetCorpus)
         * 100;

    if (progress >= 80)
        return 5;

    if (progress >= 50)
        return 3;

    return 1;
}

export function
calculateFinancialHealthV2({

    totalIncome,
    totalExpense,
    totalSavings,
    totalInvestments,

    insurances,
    loans,

    completedGoals,
    totalGoals,

    retirement

}) {

    const savings =
        calculateSavingsScore(
            totalIncome,
            totalSavings
        );

    const investments =
        calculateInvestmentScore(
            totalIncome,
            totalInvestments
        );

    const insurance =
        calculateInsuranceScore(
            insurances,
            totalIncome * 12
        );

    const debt =
        calculateDebtScore(
            loans,
            totalIncome
        );

    const emergency =
        calculateEmergencyScore(
            totalSavings,
            totalExpense
        );

    const goals =
        calculateGoalScore(
            completedGoals,
            totalGoals
        );

    const cashflow =
        calculateCashFlowScore(
            totalIncome,
            totalExpense
        );

    const fire =
        calculateFireScore(
            retirement
        );

    const total =
        savings +
        investments +
        insurance +
        debt +
        emergency +
        goals +
        cashflow +
        fire;

    return {

        total,

        breakdown: {
            savings,
            investments,
            insurance,
            debt,
            emergency,
            goals,
            cashflow,
            fire,
        },
    };
}