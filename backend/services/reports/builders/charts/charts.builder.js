import { buildExpenseChart } from "./expense.chart.js";
import { buildIncomeChart } from "./income.chart.js";
import { buildCashFlowChart } from "./cashflow.chart.js";

export const buildCharts = async (
    doc,
    report
) => {

    await buildExpenseChart(
        doc,
        report.analytics.expenseAnalytics
    );

    await buildIncomeChart(
        doc,
        report.analytics.incomeAnalytics
    );

    await buildCashFlowChart(
        doc,
        report.analytics.cashFlow
    );

};