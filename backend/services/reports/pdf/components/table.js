export const buildTable = (
    doc,
    headers,
    rows
) => {

    const startX = 50;

    let y = doc.y;

    const columnWidth = 220;

    doc
        .fontSize(12)
        .fillColor("#2563eb");

    headers.forEach((header, index) => {

        doc.text(
            header,
            startX + index * columnWidth,
            y
        );

    });

    y += 20;

    doc
        .moveTo(startX, y)
        .lineTo(550, y)
        .stroke("#d1d5db");

    y += 10;

    doc
        .fontSize(11)
        .fillColor("#111827");

    rows.forEach((row) => {

        row.forEach((cell, index) => {

            doc.text(
                String(cell),
                startX + index * columnWidth,
                y
            );

        });

        y += 20;

    });

    doc.y = y + 10;

};