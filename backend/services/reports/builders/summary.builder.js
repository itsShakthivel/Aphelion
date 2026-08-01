import { buildHeader } from "../pdf/components/header.js";

const buildExecutiveSummary = (

    doc,

    summary

) => {

    doc

        .fontSize(18)

        .fillColor("#111827")

        .text("Executive Summary");

    doc.moveDown();

    doc

        .fontSize(12)

        .fillColor("black");

    doc.text(

        `Net Worth : ₹${summary.netWorth.netWorth.toLocaleString()}`

    );

    doc.text(

        `Financial Health : ${summary.financialHealth.total}/100`

    );

    doc.text(

        `Monthly Income : ₹${summary.overview.income.toLocaleString()}`

    );

    doc.text(

        `Monthly Expense : ₹${summary.overview.expenses.toLocaleString()}`

    );

    doc.text(

        `Savings Rate : ${summary.overview.savingsRate}%`

    );

    doc.moveDown(2);

};

export const buildSummary = (
    doc,
    report
) => {

    buildHeader(doc);

    buildExecutiveSummary(
        doc,
        report.summary
    );

};