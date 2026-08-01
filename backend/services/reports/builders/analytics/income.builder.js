import { sectionTitle } from "../../pdf/components/section.js";
import { buildTable } from "../../pdf/components/table.js";

export const buildIncomeAnalytics = (
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