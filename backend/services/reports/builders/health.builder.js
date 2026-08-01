import { sectionTitle } from "../pdf/components/section.js";

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

export const buildHealth = (
    doc,
    report
) => {

    buildFinancialHealth(
        doc,
        report.summary.financialHealth
    );

    buildRiskSummary(
        doc,
        report.summary.financialHealth
    );

};