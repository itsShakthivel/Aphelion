import { generatePieChart } from "../../pdf/utils/chartGenerator.js";
import { sectionTitle } from "../../pdf/components/section.js";

export const buildExpenseChart = async (
    doc,
    expenseAnalytics
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Expense Distribution"
    );

    const chart = await generatePieChart(

        expenseAnalytics.map(
            item => item.category
        ),

        expenseAnalytics.map(
            item => item.amount
        ),

        "Expense Distribution"

    );

    doc.image(
        chart,
        {
            width: 450,
            align: "center",
        }
    );

    doc.moveDown(2);

};