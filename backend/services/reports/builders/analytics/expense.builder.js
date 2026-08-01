import { sectionTitle } from "../../pdf/components/section.js";
import { buildTable } from "../../pdf/components/table.js";

export const buildExpenseAnalytics = (
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
