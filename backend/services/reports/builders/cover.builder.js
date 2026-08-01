export const buildCoverPage = (
    doc,
    report
) => {

    const {

        metadata,

    } = report;

    doc

        .fontSize(34)

        .fillColor("#2563eb")

        .text(

            "APHELION",

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc

        .fontSize(24)

        .fillColor("#111827")

        .text(

            "Financial Report",

            {

                align: "center",

            }

        );

    doc.moveDown(3);

    doc

        .fontSize(16)

        .fillColor("#374151")

        .text(

            `Template : ${metadata.template}`,

            {

                align: "center",

            }

        );

    doc.moveDown();

    doc.text(

        `Report Type : ${metadata.reportType}`,

        {

            align: "center",

        }

    );

    doc.moveDown();

    doc.text(

        `Generated : ${new Date(

            metadata.generatedAt

        ).toLocaleString()}`,

        {

            align: "center",

        }

    );

    doc.moveDown();

    doc.text(

        `Period`,

        {

            align: "center",

        }

    );

    doc.text(

        `${metadata.period.startDate || "-"}

to

${metadata.period.endDate || "-"}`,

        {

            align: "center",

        }

    );

    doc.moveDown(8);

    doc

        .fontSize(13)

        .fillColor("#6b7280")

        .text(

            "Confidential Financial Report",

            {

                align: "center",

            }

        );

};