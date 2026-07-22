import { getOverview } from "./overview.service.js";
import { getExpenseAnalytics } from "./expense.service.js";
import { getIncomeAnalytics } from "./income.service.js";
import { getCashFlowAnalytics } from "./cashFlow.service.js";
import { getFinancialHealth } from "./health.service.js";

import { generateFinancialInsights } from "../../utils/financialInsightsEngine.js";

export const getFinancialInsights = async (userId, query) => {

    const [

        overview,

        expenseAnalytics,

        incomeAnalytics,

        cashFlow,

        financialHealth,

    ] = await Promise.all([

        getOverview(userId, query),

        getExpenseAnalytics(userId, query),

        getIncomeAnalytics(userId, query),

        getCashFlowAnalytics(userId, query),

        getFinancialHealth(userId, query),

    ]);

    const input = {

        totalIncome:
            overview.income,

        totalExpense:
            overview.expenses,

        totalSavings:
            overview.savings,

        totalInvestments:
            overview.investments.currentValue,

        netWorth:
            overview.netWorth,

        savingsRate:
            overview.savingsRate,

        debtRatio:
            financialHealth.metrics.debtToIncomeRatio,

        emergencyFund:
            financialHealth.breakdown.emergency.score,

        completedGoals:
            overview.goals.completed,

        fireProgress:
            financialHealth.breakdown.fire.score,

        expenseAnalytics,

        incomeAnalytics,

        cashFlow,

    };

    return generateFinancialInsights(input);

};