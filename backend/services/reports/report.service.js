import { getOverview } from "../analytics/overview.service.js";
import {
    getExpenseAnalytics,
    getMonthlyExpenseTrend,
} from "../analytics/expense.service.js";
import { getIncomeAnalytics } from "../analytics/income.service.js";
import { getCashFlowAnalytics } from "../analytics/cashFlow.service.js";
import {
    getNetWorthAnalytics,
    getNetWorthTimeline,
} from "../analytics/netWorth.service.js";
import { getFinancialHealth } from "../analytics/health.service.js";

import {
    calculateFIREPlan,
} from "../fireService.js";

import { getReportTemplate } from "./template.service.js";

export const generateFinancialReport = async (userId, query) => {

    const [

        overview,

        expenseAnalytics,

        monthlyExpenseTrend,

        incomeAnalytics,

        cashFlow,

        netWorth,

        netWorthTimeline,

        financialHealth,

        fire,

        insights,

    ] = await Promise.all([

        getOverview(userId, query),

        getExpenseAnalytics(userId, query),

        getMonthlyExpenseTrend(userId, query),

        getIncomeAnalytics(userId, query),

        getCashFlowAnalytics(userId, query),

        getNetWorthAnalytics(userId),

        getNetWorthTimeline(userId),

        getFinancialHealth(userId, query),

        calculateFIREPlan(userId),

        getFinancialInsights(userId, query)

    ]);

    const template = getReportTemplate(

        query.reportType || "monthly"

    );

    return {

        metadata: {

            generatedAt:

                new Date(),

            reportType:

                query.reportType ||

                "monthly",

            template:

                template.title,

            period: {

                startDate:

                    query.startDate ||

                    null,

                endDate:

                    query.endDate ||

                    null,

            },

        },

        summary: {

            overview,

            financialHealth,

            netWorth,

            fire,

            insights,

        },

        analytics: {

            expenseAnalytics,

            incomeAnalytics,

            cashFlow,

            monthlyExpenseTrend,

            netWorthTimeline,

        },

        template,

    };

};