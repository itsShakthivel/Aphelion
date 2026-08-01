import { sectionTitle } from "../../pdf/components/section.js";
import { buildTable } from "../../pdf/components/table.js";


export const buildCashFlow = (
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