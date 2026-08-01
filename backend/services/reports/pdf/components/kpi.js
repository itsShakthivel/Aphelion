import {

    COLORS,

    FONT,

} from "../styles.js";

export const drawKPI = (

    doc,

    title,

    value,

    color = COLORS.primary

) => {

    const startX = doc.x;

    const startY = doc.y;

    doc

        .roundedRect(

            startX,

            startY,

            220,

            55,

            8

        )

        .stroke(color);

    doc

        .fontSize(FONT.small)

        .fillColor(COLORS.gray)

        .text(

            title,

            startX + 12,

            startY + 10

        );

    doc

        .fontSize(FONT.subHeading)

        .fillColor(color)

        .text(

            value,

            startX + 12,

            startY + 28

        );

    doc.moveDown(4);

};