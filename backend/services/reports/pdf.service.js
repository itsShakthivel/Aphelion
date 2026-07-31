import PDFDocument from "pdfkit";

import {

    generatePieChart,

    generateBarChart,

    generateLineChart,

} from "./pdf/chartGenerator.js";

export const generatePDFReport = (report) => {

    return new Promise((resolve, reject) => {

        try {

            const doc = new PDFDocument({

                margin: 50,

                size: "A4",

                bufferPages: true,

            });

            const buffers = [];

            doc.on("data", buffers.push.bind(buffers));

            doc.on("end", () => {

                resolve(Buffer.concat(buffers));

            });

            await buildReport(doc, report);

            addPageNumbers(doc);

            doc.end();

        }

        catch (error) {

            reject(error);

        }

    });

};

const buildReport = async (
    doc,
    report
) => {

    buildCoverPage(
        doc,
        report
    );

    doc.addPage();

    buildHeader(
        doc,
        report.metadata
    );

    buildExecutiveSummary(
        doc,
        report.summary
    );

    buildFinancialHealth(
        doc,
        report.summary.financialHealth
    );

    buildRiskSummary(

        doc,

        report.summary.financialHealth

    );

    buildAIRecommendations(

        doc,

        report.summary.insights

    );

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

    buildFireSection(
        doc,
        report.summary.fire
    );

    buildFooter(doc);

    buildReportSignature(

        doc,

        report.metadata

    );

};

await buildCharts(

    doc,

    report.analytics,

    report.summary

);

const buildCoverPage = (
    doc,
    report
) => {

    const {

        metadata,

    } = report;

    doc

        .fontSize(34)

        .fillColor("#2563eb")

        .text(

            "APHELION",

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc

        .fontSize(24)

        .fillColor("#111827")

        .text(

            "Financial Report",

            {

                align: "center",

            }

        );

    doc.moveDown(3);

    doc

        .fontSize(16)

        .fillColor("#374151")

        .text(

            `Template : ${metadata.template}`,

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc.text(

        `Report Type : ${metadata.reportType}`,

        {

            align: "center",

        }

    );

    doc.moveDown();

    doc.text(

        `Generated : ${new Date(

            metadata.generatedAt

        ).toLocaleString()}`,

        {

            align: "center",

        }

    );

    doc.moveDown();

    doc.text(

        `Period`,

        {

            align: "center",

        }

    );

    doc.text(

        `${metadata.period.startDate || "-"}

to

${metadata.period.endDate || "-"}`,

        {

            align: "center",

        }

    );

    doc.moveDown(8);

    doc

        .fontSize(13)

        .fillColor("#6b7280")

        .text(

            "Confidential Financial Report",

            {

                align: "center",

            }

        );

};

const buildHeader = (doc) => {

    doc

        .fontSize(24)

        .fillColor("#2563eb")

        .text("APHELION");

    doc

        .moveDown(0.5);

    doc

        .fontSize(18)

        .fillColor("black")

        .text("Financial Report");

    doc

        .moveDown();

    doc

        .fontSize(10)

        .fillColor("gray")

        .text(

            `Generated: ${new Date().toLocaleString()}`

        );

    doc.moveDown(2);

};

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


const buildFinancialHealth = (
    doc,
    health
) => {

    doc

        .addPage()

        .fontSize(18)

        .fillColor("#2563eb")

        .text("Financial Health");

    doc.moveDown();

    doc

        .fontSize(14)

        .fillColor("black")

        .text(
            `Overall Score : ${health.total}/100`
        );

    doc.text(
        `Health Level : ${health.level}`
    );

    doc.text(
        `Status : ${health.status}`
    );

    doc.moveDown();

    Object.entries(
        health.breakdown
    ).forEach(([key, value]) => {

        doc.text(
            `${key} : ${value.score}/${value.max}`
        );

    });

    doc.moveDown(2);

};

const buildRiskSummary = (

    doc,

    health

) => {

    doc.addPage();

    sectionTitle(

        doc,

        "Risk Summary"

    );

    let risk = "Low";

    const risks = [];

    if (

        health.total < 50

    ) {

        risk = "High";

    }

    else if (

        health.total < 75

    ) {

        risk = "Medium";

    }

    doc

        .fontSize(14)

        .text(

            `Overall Risk : ${risk}`

        );

    doc.moveDown();

    if (

        health.breakdown.savings.score < 15

    ) {

        risks.push(

            "Savings rate below target."

        );

    }

    if (

        health.breakdown.debt.score < 10

    ) {

        risks.push(

            "Debt ratio is high."

        );

    }

    if (

        health.breakdown.emergency.score < 10

    ) {

        risks.push(

            "Emergency fund is insufficient."

        );

    }

    if (

        risks.length === 0

    ) {

        risks.push(

            "No significant financial risks detected."

        );

    }

    risks.forEach(

        (riskItem) =>

            doc.text(

                `• ${riskItem}`

            )

    );

    doc.moveDown(2);

};

const buildCharts = async (

    doc,

    analytics,

    summary

) => {

    doc.addPage();

    sectionTitle(

        doc,

        "Financial Charts"

    );

    const expenseChart =

        await generatePieChart(

            analytics.expenseAnalytics.map(

                item => item.category

            ),

            analytics.expenseAnalytics.map(

                item => item.amount

            ),

            "Expense Distribution"

        );

    doc.image(

        expenseChart,

        {

            width: 450,

            align: "center",

        }

    );

    doc.moveDown(2);

    const incomeChart =

        await generateBarChart(

            analytics.incomeAnalytics.map(

                item => item.source

            ),

            analytics.incomeAnalytics.map(

                item => item.amount

            ),

            "Income Sources"

        );

    doc.image(

        incomeChart,

        {

            width: 450,

            align: "center",

        }

    );

    doc.addPage();

    const cashFlowChart =

        await generateLineChart(

            analytics.cashFlow.map(

                item => item.month

            ),

            analytics.cashFlow.map(

                item => item.cashFlow

            ),

            "Cash Flow"

        );

    doc.image(

        cashFlowChart,

        {

            width: 450,

            align: "center",

        }

    );

};

const buildNetWorth = (
    doc,
    netWorth
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Net Worth"
    );

    buildTable(

        doc,

        [

            "Metric",

            "Value",

        ],

        [

            [

                "Assets",

                `₹${netWorth.assets.toLocaleString()}`,

            ],

            [

                "Liabilities",

                `₹${netWorth.liabilities.toLocaleString()}`,

            ],

            [

                "Net Worth",

                `₹${netWorth.netWorth.toLocaleString()}`,

            ],

        ]

    );

};

const buildTable = (
    doc,
    headers,
    rows
) => {

    const startX = 50;

    let y = doc.y;

    const columnWidth = 220;

    doc
        .fontSize(12)
        .fillColor("#2563eb");

    headers.forEach((header, index) => {

        doc.text(
            header,
            startX + index * columnWidth,
            y
        );

    });

    y += 20;

    doc
        .moveTo(startX, y)
        .lineTo(550, y)
        .stroke("#d1d5db");

    y += 10;

    doc
        .fontSize(11)
        .fillColor("#111827");

    rows.forEach((row) => {

        row.forEach((cell, index) => {

            doc.text(

                String(cell),

                startX + index * columnWidth,

                y

            );

        });

        y += 20;

    });

    doc.y = y + 10;

};

const buildExpenseAnalytics = (
    doc,
    expenses
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Expense Analytics"
    );

    const rows = expenses.map((item) => [

        item.category,

        `₹${item.amount.toLocaleString()}`,

    ]);

    buildTable(

        doc,

        [

            "Category",

            "Amount",

        ],

        rows

    );

    const total = expenses.reduce(

        (sum, item) =>

            sum + item.amount,

        0

    );

    doc.moveDown();

    doc

        .fontSize(12)

        .fillColor("#2563eb")

        .text(

            `Total Expense : ₹${total.toLocaleString()}`

        );

};

const buildIncomeAnalytics = (
    doc,
    income
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Income Analytics"
    );

    const rows = income.map((item) => [

        item.source,

        `₹${item.amount.toLocaleString()}`,

    ]);

    buildTable(

        doc,

        [

            "Income Source",

            "Amount",

        ],

        rows

    );

    const total = income.reduce(

        (sum, item) =>

            sum + item.amount,

        0

    );

    doc.moveDown();

    doc

        .fontSize(12)

        .fillColor("#2563eb")

        .text(

            `Total Income : ₹${total.toLocaleString()}`

        );

};

const buildCashFlow = (
    doc,
    cashFlow
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Cash Flow"
    );

    const rows = cashFlow.map((item) => [

        item.month,

        `₹${item.income.toLocaleString()}`,

        `₹${item.expense.toLocaleString()}`,

        `₹${item.cashFlow.toLocaleString()}`,

    ]);

    buildTable(

        doc,

        [

            "Month",

            "Income",

            "Expense",

            "Cash Flow",

        ],

        rows

    );

};

const buildFireSection = (
    doc,
    fire
) => {

    doc

        .addPage()

        .fontSize(18)

        .fillColor("#2563eb")

        .text("FIRE Progress");

    doc.moveDown();

    doc.text(
        `Current Wealth : ₹${fire.currentWealth.toLocaleString()}`
    );

    doc.text(
        `FIRE Corpus : ₹${fire.fireCorpus.toLocaleString()}`
    );

    doc.text(
        `Progress : ${fire.progress}%`
    );

    doc.text(
        `Years Remaining : ${fire.yearsRemaining}`
    );

    doc.text(
        `Estimated FIRE Age : ${fire.estimatedFireAge}`
    );

    doc.moveDown(2);

};

const buildFooter = (
    doc
) => {

    doc

        .fontSize(10)

        .fillColor("gray")

        .text(

            "Generated by Aphelion Financial Operating System",

            50,

            doc.page.height - 50,

            {

                align: "center",

            }

        );

};

const addPageNumbers = (doc) => {

    const range = doc.bufferedPageRange();

    for (

        let i = 0;

        i < range.count;

        i++

    ) {

        doc.switchToPage(i);

        doc

            .fontSize(10)

            .fillColor("#6b7280")

            .text(

                `Page ${i + 1} of ${range.count}`,

                0,

                doc.page.height - 45,

                {

                    align: "center",

                }

            );

    }

};

const buildAIRecommendations = (
    doc,
    insights
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "AI Financial Recommendations"
    );

    if (!insights.length) {

        doc.text(
            "No recommendations available."
        );

        return;

    }

    insights.slice(0, 5).forEach(

        (item, index) => {

            doc

                .fontSize(12)

                .text(

                    `${index + 1}. ${item.title}`

                );

            doc

                .fontSize(11)

                .fillColor("#6b7280")

                .text(

                    item.recommendation

                );

            doc.moveDown();

        }

    );

};

const buildReportSignature = (
    doc,
    metadata
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Report Information"
    );

    buildTable(

        doc,

        [

            "Property",

            "Value",

        ],

        [

            [

                "Version",

                metadata.version,

            ],

            [

                "Engine",

                metadata.engine,

            ],

            [

                "Template",

                metadata.template,

            ],

            [

                "Generated",

                new Date(
                    metadata.generatedAt
                ).toLocaleString(),

            ],

        ]

    );

    doc.moveDown(4);

    doc

        .fontSize(12)

        .fillColor("#111827")

        .text(

            "Generated by",

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc

        .fontSize(18)

        .fillColor("#2563eb")

        .text(

            "APHELION",

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc

        .fontSize(11)

        .fillColor("#6b7280")

        .text(

            "Financial Operating System",

            {

                align: "center",

            }

        );

};