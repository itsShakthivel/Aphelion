export const addPageNumbers = (doc) => {

    const range = doc.bufferedPageRange();

    for (let i = 0; i < range.count; i++) {

        doc.switchToPage(i);

        doc
            .fontSize(10)
            .fillColor("#6b7280")
            .text(
                `Page ${i + 1} of ${range.count}`,
                0,
                doc.page.height - 45,
                {
                    align: "center",
                }
            );

    }

};