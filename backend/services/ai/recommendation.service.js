import { generateFinancialTwin } from "./financialTwin.service.js";

import { savingsRule } from "./recommendations/savings.rule.js";
import { investmentRule } from "./recommendations/investment.rule.js";
import { debtRule } from "./recommendations/debt.rule.js";
import { insuranceRule } from "./recommendations/insurance.rule.js";
import { expensesRule } from "./recommendations/expenses.rule.js";
import { goalsRule } from "./recommendations/goals.rule.js";
import { fireRule } from "./recommendations/fire.rule.js";

export const generateRecommendations = async (userId) => {

    const twin = await generateFinancialTwin(userId);

    const recommendations = [

        ...savingsRule(twin),

        ...investmentRule(twin),

        ...debtRule(twin),

        ...insuranceRule(twin),

        ...expensesRule(twin),

        ...goalsRule(twin),

        ...fireRule(twin),

    ];

    const summary = {

        total: recommendations.length,

        critical: recommendations.filter(r => r.priority === "Critical").length,

        high: recommendations.filter(r => r.priority === "High").length,

        medium: recommendations.filter(r => r.priority === "Medium").length,

        low: recommendations.filter(r => r.priority === "Low").length,

        positive: recommendations.filter(r => r.priority === "Positive").length,

    };

    return {

        summary,

        recommendations,

    };

};