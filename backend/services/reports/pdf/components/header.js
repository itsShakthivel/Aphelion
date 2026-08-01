import {

    COLORS,

    FONT,

} from "../utils/styles.js";

export const buildHeader = (

    doc,

    metadata

) => {

    doc

        .fontSize(FONT.title)

        .fillColor(COLORS.primary)

        .text(

            "APHELION",

            {

                align: "center",

            }

        );

    doc.moveDown(0.3);

    doc

        .fontSize(FONT.heading)

        .fillColor(COLORS.dark)

        .text(

            metadata.template,

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc

        .fontSize(FONT.small)

        .fillColor(COLORS.gray)

        .text(

            `Generated on ${new Date(

                metadata.generatedAt

            ).toLocaleString()}`,

            {

                align: "center",

            }

        );

    doc.moveDown(2);

};