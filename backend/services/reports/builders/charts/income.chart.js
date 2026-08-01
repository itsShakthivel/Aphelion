import { generateBarChart } from "../../pdf/utils/chartGenerator.js";
import { sectionTitle } from "../../pdf/components/section.js";

export const buildIncomeChart = async (
    doc,
    incomeAnalytics
) => {

    sectionTitle(
        doc,
        "Income Sources"
    );

    const chart = await generateBarChart(

        incomeAnalytics.map(
            item => item.source
        ),

        incomeAnalytics.map(
            item => item.amount
        ),

        "Income Sources"

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