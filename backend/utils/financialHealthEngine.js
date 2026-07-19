/*
====================================================
Financial Health Engine
====================================================
Calculates the Financial Health Score (100 points)
====================================================
*/

/*
====================================================
Score Constants
====================================================
*/

const SCORE = {
    SAVINGS: 20,
    INVESTMENTS: 15,
    INSURANCE: 20,
    DEBT: 20,
    EMERGENCY: 10,
    GOALS: 5,
    CASHFLOW: 5,
    FIRE: 5,
};

/*
====================================================
Thresholds
====================================================
*/

const THRESHOLD = {

    SAVINGS: {
        EXCELLENT: 30,
        GOOD: 20,
        AVERAGE: 10,
    },

    INVESTMENTS: {
        GOOD: 20,
        AVERAGE: 10,
    },

    EMERGENCY: {
        EXCELLENT: 12,
        GOOD: 6,
        AVERAGE: 3,
    },

    GOALS: {
        EXCELLENT: 80,
        GOOD: 50,
    },

    DEBT: {
        EXCELLENT: 20,
        GOOD: 35,
        AVERAGE: 50,
    },

};

/*
====================================================
Savings
====================================================
*/

function calculateSavingsScore(totalIncome, totalSavings) {

    if (!totalIncome) return 0;

    const rate = (totalSavings / totalIncome) * 100;

    if (rate >= THRESHOLD.SAVINGS.EXCELLENT)
        return SCORE.SAVINGS;

    if (rate >= THRESHOLD.SAVINGS.GOOD)
        return 15;

    if (rate >= THRESHOLD.SAVINGS.AVERAGE)
        return 10;

    if (rate > 0)
        return 5;

    return 0;
}

/*
====================================================
Investments
====================================================
*/

function calculateInvestmentScore(totalIncome, totalInvestments) {

    if (!totalIncome) return 0;

    const ratio =
        (totalInvestments / totalIncome) * 100;

    if (ratio >= THRESHOLD.INVESTMENTS.GOOD)
        return SCORE.INVESTMENTS;

    if (ratio >= THRESHOLD.INVESTMENTS.AVERAGE)
        return 10;

    return 5;
}

/*
====================================================
Insurance
====================================================
*/

function calculateInsuranceScore(insurances, annualIncome) {

    let score = 0;

    const health = insurances.find(
        insurance => insurance.type === "health"
    );

    const term = insurances.find(
        insurance => insurance.type === "term"
    );

    if (health) {

        if (health.coverageAmount >= 1000000)
            score += 10;

        else if (health.coverageAmount >= 500000)
            score += 7;

    }

    if (term) {

        if (term.coverageAmount >= annualIncome * 15)
            score += 10;

        else if (term.coverageAmount >= annualIncome * 10)
            score += 7;

    }

    return Math.min(score, SCORE.INSURANCE);
}

/*
====================================================
Debt
====================================================
*/

function calculateDebtScore(loans, monthlyIncome) {

    if (!monthlyIncome) return 0;

    const totalEMI = loans.reduce(
        (sum, loan) => sum + loan.emi,
        0
    );

    const ratio =
        (totalEMI / monthlyIncome) * 100;

    if (ratio <= THRESHOLD.DEBT.EXCELLENT)
        return SCORE.DEBT;

    if (ratio <= THRESHOLD.DEBT.GOOD)
        return 15;

    if (ratio <= THRESHOLD.DEBT.AVERAGE)
        return 8;

    return 0;
}

/*
====================================================
Emergency Fund
====================================================
*/

function calculateEmergencyScore(totalSavings, totalExpense) {

    if (totalSavings >= totalExpense * THRESHOLD.EMERGENCY.EXCELLENT)
        return SCORE.EMERGENCY;

    if (totalSavings >= totalExpense * THRESHOLD.EMERGENCY.GOOD)
        return 8;

    if (totalSavings >= totalExpense * THRESHOLD.EMERGENCY.AVERAGE)
        return 5;

    return 2;
}

/*
====================================================
Goals
====================================================
*/

function calculateGoalScore(completedGoals, totalGoals) {

    if (!totalGoals)
        return SCORE.GOALS;

    const progress =
        (completedGoals / totalGoals) * 100;

    if (progress >= THRESHOLD.GOALS.EXCELLENT)
        return SCORE.GOALS;

    if (progress >= THRESHOLD.GOALS.GOOD)
        return 3;

    return 1;
}

/*
====================================================
Cash Flow
====================================================
*/

function calculateCashFlowScore(totalIncome, totalExpense) {

    return totalIncome > totalExpense
        ? SCORE.CASHFLOW
        : 0;
}

/*
====================================================
FIRE
====================================================
*/

function calculateFireScore(retirement) {

    if (!retirement)
        return 0;

    const progress =
        (retirement.currentCorpus /
            retirement.targetCorpus) * 100;

    if (progress >= 80)
        return SCORE.FIRE;

    if (progress >= 50)
        return 3;

    return 1;
}

/*
====================================================
Health Level
====================================================
*/

function getHealthLevel(score) {

    if (score >= 90)
        return {
            level: "Excellent",
            status: "success",
        };

    if (score >= 75)
        return {
            level: "Good",
            status: "info",
        };

    if (score >= 60)
        return {
            level: "Average",
            status: "warning",
        };

    return {
        level: "Needs Improvement",
        status: "danger",
    };
}

/*
====================================================
Financial Health Engine
====================================================
*/

export function calculateFinancialHealth({

    totalIncome,
    totalExpense,
    totalSavings,
    totalInvestments,

    insurances,
    loans,

    monthlyEMI,
    debtToIncomeRatio,

    completedGoals,
    totalGoals,

    retirement,

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

    const { level, status } =
        getHealthLevel(total);

    return {

        total,

        level,

        status,

        breakdown: {

            savings: {
                score: savings,
                max: SCORE.SAVINGS,
            },

            investments: {
                score: investments,
                max: SCORE.INVESTMENTS,
            },

            insurance: {
                score: insurance,
                max: SCORE.INSURANCE,
            },

            debt: {
                score: debt,
                max: SCORE.DEBT,
            },

            emergency: {
                score: emergency,
                max: SCORE.EMERGENCY,
            },

            goals: {
                score: goals,
                max: SCORE.GOALS,
            },

            cashflow: {
                score: cashflow,
                max: SCORE.CASHFLOW,
            },

            fire: {
                score: fire,
                max: SCORE.FIRE,
            },

        },

        metrics: {

            monthlyEMI,

            debtToIncomeRatio,

        },

    };

}