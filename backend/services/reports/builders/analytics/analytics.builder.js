import { buildExpenseAnalytics } from "./expense.builder.js";
import { buildIncomeAnalytics } from "./income.builder.js";
import { buildCashFlow } from "./cashflow.builder.js";
import { buildNetWorth } from "./networth.builder.js";

export const buildAnalytics = (
    doc,
    report
) => {

    buildNetWorth(
        doc,
        report.summary.netWorth
    );

    buildExpenseAnalytics(
        doc,
        report.analytics.expenseAnalytics
    );

    buildIncomeAnalytics(
        doc,
        report.analytics.incomeAnalytics
    );

    buildCashFlow(
        doc,
        report.analytics.cashFlow
    );

};