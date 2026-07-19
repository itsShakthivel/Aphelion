export const calculateFIRE = ({
    monthlyExpense,
    currentWealth,
    expectedReturn,
    inflation,
    currentAge,
    retirementAge,
    monthlyInvestment,
    fireMultiplier,
}) => {
    // Calculation logic here

    const annualExpense = monthlyExpense * 12;

    
    const fireCorpus = annualExpense * fireMultiplier;
    const safeWithdrawal = fireCorpus * 0.04;

    const remainingAmount = Math.max(
        fireCorpus - currentWealth, 0
    );

    const progress = fireCorpus > 0 ? (currentWealth / fireCorpus) * 100 : 0

    //Future Growth Estimation

    const realReturn = ((1 + expectedReturn / 100) / (1 + inflation / 100) - 1) * 100;

    let projectedWealth = currentWealth;

    let yearsRemaining = 0;

    while (projectedWealth < fireCorpus && yearsRemaining < 100) {
        projectedWealth = projectedWealth * (1 + realReturn / 100) + monthlyInvestment * 12;

        yearsRemaining++;
    }

    const estimatedFireAge = Math.min(currentAge + yearsRemaining, 100);

    return {

        monthlyExpense,

        annualExpense,

        fireCorpus,

        safeWithdrawal,

        currentWealth,

        monthlyInvestment,

        remainingAmount,

        progress: Number(progress.toFixed(2)),

        yearsRemaining,

        estimatedFireAge,

        currentAge,

        retirementAge,

        expectedReturn,

        inflation,

        fireMultiplier,

        realReturn: Number(realReturn.toFixed(2)),

    };
};