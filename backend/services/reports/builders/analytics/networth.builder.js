import { sectionTitle } from "../../pdf/components/section.js";
import { buildTable } from "../../pdf/components/table.js";

export const buildNetWorth = (
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