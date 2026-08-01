import { generateLineChart } from "../../pdf/utils/chartGenerator.js";
import { sectionTitle } from "../../pdf/components/section.js";

export const buildCashFlowChart = async (
    doc,
    cashFlow
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "Cash Flow"
    );

    const chart = await generateLineChart(

        cashFlow.map(
            item => item.month
        ),

        cashFlow.map(
            item => item.cashFlow
        ),

        "Cash Flow"

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