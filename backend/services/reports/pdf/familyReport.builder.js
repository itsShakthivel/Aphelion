import {
    buildTable,
} from "./components/table.js";

import { sectionTitle, } from "./components/section.js"

// ============================================
// Currency
// ============================================

const formatCurrency = value => {

    return `₹ ${Number(
        value || 0
    ).toLocaleString("en-IN")}`;

};

// ============================================
// Header
// ============================================

const buildHeader = (
    doc,
    report
) => {

    doc
        .fontSize(26)
        .font("Helvetica-Bold")
        .text(

            report.family.name,

            {

                align: "center",

            }

        );

    doc
        .moveDown(0.4)

        .fontSize(16)

        .font("Helvetica")

        .text(

            "Household Financial Report",

            {

                align: "center",

            }

        );

    doc
        .moveDown(0.5)

        .fontSize(9)

        .fillColor("#666666")

        .text(

            `Generated ${new Date(
                report.generatedAt
            ).toLocaleDateString("en-IN")}`,

            {

                align: "center",

            }

        );

    doc
        .fillColor("#000000")

        .moveDown(2);

};

// ============================================
// Treasury
// ============================================

const buildTreasury = (
    doc,
    treasury
) => {

    sectionTitle(

        doc,

        "Household Treasury"

    );

    buildTable(

        doc,

        [

            ["Metric", "Amount"],

            [
                "Total Balance",
                formatCurrency(
                    treasury.totalBalance
                ),
            ],

            [
                "Available Balance",
                formatCurrency(
                    treasury.availableBalance
                ),
            ],

            [
                "Emergency Reserve",
                formatCurrency(
                    treasury.emergencyReserve
                ),
            ],

            [
                "Investment Reserve",
                formatCurrency(
                    treasury.investmentReserve
                ),
            ],

            [
                "Goal Reserve",
                formatCurrency(
                    treasury.goalReserve
                ),
            ],

        ]

    );

    doc.moveDown(1);

};

// ============================================
// Contributions
// ============================================

const buildContributions = (
    doc,
    contributions
) => {

    sectionTitle(

        doc,

        "Contributions"

    );

    doc
        .fontSize(11)
        .font("Helvetica")

        .text(

            `Total Contributions: ${formatCurrency(
                contributions.total
            )}`

        );

    doc

        .moveDown(0.4)

        .text(

            `Contribution Records: ${contributions.count}`

        );

    doc.moveDown(1);

};

// ============================================
// Goals
// ============================================

const buildGoals = (
    doc,
    goals
) => {

    sectionTitle(

        doc,

        "Household Goals"

    );

    if (
        goals.records.length === 0
    ) {

        doc
            .fontSize(10)
            .text(
                "No household goals recorded."
            );

        return;

    }

    const rows = [

        [

            "Goal",

            "Target",

            "Current",

            "Status",

        ],

    ];

    goals.records.forEach(

        goal => {

            rows.push([

                goal.name,

                formatCurrency(
                    goal.targetAmount
                ),

                formatCurrency(
                    goal.currentAmount
                ),

                goal.status,

            ]);

        }

    );

    buildTable(

        doc,

        rows

    );

    doc.moveDown(1);

};

// ============================================
// Debt
// ============================================

const buildDebt = (
    doc,
    loans
) => {

    sectionTitle(

        doc,

        "Household Debt"

    );

    doc

        .fontSize(11)

        .text(

            `Outstanding Debt: ${formatCurrency(
                loans.outstanding
            )}`

        );

    doc.moveDown(0.5);

    if (
        loans.records.length === 0
    ) {

        doc
            .fontSize(10)
            .text(
                "No household loans recorded."
            );

        return;

    }

    const rows = [

        [

            "Loan",

            "Type",

            "Original",

            "Remaining",

            "Status",

        ],

    ];

    loans.records.forEach(

        loan => {

            rows.push([

                loan.name,

                loan.loanType,

                formatCurrency(
                    loan.originalAmount
                ),

                formatCurrency(
                    loan.remainingAmount
                ),

                loan.status,

            ]);

        }

    );

    buildTable(

        doc,

        rows

    );

    doc.moveDown(1);

};

// ============================================
// Insurance
// ============================================

const buildInsurance = (
    doc,
    insurance
) => {

    sectionTitle(

        doc,

        "Household Insurance"

    );

    doc

        .fontSize(11)

        .text(

            `Active Policies: ${insurance.activeCount}`

        );

    doc.moveDown(0.5);

    if (
        insurance.records.length === 0
    ) {

        doc
            .fontSize(10)
            .text(
                "No household insurance policies recorded."
            );

        return;

    }

    const rows = [

        [

            "Policy",

            "Provider",

            "Type",

            "Premium",

            "Renewal",

        ],

    ];

    insurance.records.forEach(

        policy => {

            rows.push([

                policy.policyName,

                policy.provider,

                policy.insuranceType,

                formatCurrency(
                    policy.premiumAmount
                ),

                policy.renewalDate

                    ? new Date(
                        policy.renewalDate
                    ).toLocaleDateString(
                        "en-IN"
                    )

                    : "-",

            ]);

        }

    );

    buildTable(

        doc,

        rows

    );

    doc.moveDown(1);

};

// ============================================
// Investments
// ============================================

const buildInvestments = (
    doc,
    investments
) => {

    sectionTitle(

        doc,

        "Household Investments"

    );

    doc

        .fontSize(11)

        .text(

            `Total Investments: ${formatCurrency(
                investments.total
            )}`

        );

    doc

        .moveDown(0.4)

        .text(

            `Investment Records: ${investments.count}`

        );

    doc.moveDown(1);

};

// ============================================
// Analytics
// ============================================

const buildAnalytics = (
    doc,
    analytics
) => {

    sectionTitle(

        doc,

        "Household Analytics"

    );

    buildTable(

        doc,

        [

            ["Metric", "Value"],

            [

                "Contribution Total",

                formatCurrency(
                    analytics.contributionGrowth
                ),

            ],

            [

                "Expense Total",

                formatCurrency(
                    analytics.expenseTotal
                ),

            ],

            [

                "Investment Total",

                formatCurrency(
                    analytics.investmentTotal
                ),

            ],

            [

                "Outstanding Debt",

                formatCurrency(
                    analytics.debtTotal
                ),

            ],

        ]

    );

    doc.moveDown(1);

};

// ============================================
// AI Summary
// ============================================

const buildAISummary = (
    doc,
    aiSummary
) => {

    sectionTitle(

        doc,

        "Household AI Summary"

    );

    doc

        .fontSize(10)

        .font("Helvetica")

        .text(

            aiSummary.summary

        );

};

// ============================================
// Main Builder
// ============================================

export const buildFamilyReport = (

    doc,

    report

) => {

    buildHeader(

        doc,

        report

    );

    buildTreasury(

        doc,

        report.treasury

    );

    buildContributions(

        doc,

        report.contributions

    );

    buildGoals(

        doc,

        report.goals

    );

    buildDebt(

        doc,

        report.loans

    );

    buildInsurance(

        doc,

        report.insurance

    );

    buildInvestments(

        doc,

        report.investments

    );

    buildAnalytics(

        doc,

        report.analytics

    );

    buildAISummary(

        doc,

        report.aiSummary

    );

};