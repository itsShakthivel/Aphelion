import { analyzeSpendingPattern } from "./spendingPattern.service.js";
import { analyzeIncomePattern } from "./incomePattern.service.js";
import { analyzeInvestmentPattern } from "./investmentPattern.service.js";
import { analyzeDebtPattern } from "./debtPattern.service.js";
import { analyzeSavingsPattern } from "./savingsPattern.service.js";

export const analyzeFinancialBehavior = async (userId) => {
    const [
        spending,
        income,
        investment,
        debt,
        savings,
    ] = await Promise.all([
        analyzeSpendingPattern(userId),
        analyzeIncomePattern(userId),
        analyzeInvestmentPattern(userId),
        analyzeDebtPattern(userId),
        analyzeSavingsPattern(userId),
    ]);

    return {
        spending,
        income,
        investment,
        debt,
        savings,
    };
};