import {

    COLORS,

    FONT,

} from "../utils/styles.js";

export const sectionTitle = (

    doc,

    title

) => {

    doc

        .moveDown()

        .fontSize(FONT.heading)

        .fillColor(COLORS.primary)

        .text(title);

    doc.moveDown();

};