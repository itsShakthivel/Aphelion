

const buildFireSection = (
    doc,
    fire
) => {

    doc

        .addPage()

        .fontSize(18)

        .fillColor("#2563eb")

        .text("FIRE Progress");

    doc.moveDown();

    doc.text(
        `Current Wealth : ₹${fire.currentWealth.toLocaleString()}`
    );

    doc.text(
        `FIRE Corpus : ₹${fire.fireCorpus.toLocaleString()}`
    );

    doc.text(
        `Progress : ${fire.progress}%`
    );

    doc.text(
        `Years Remaining : ${fire.yearsRemaining}`
    );

    doc.text(
        `Estimated FIRE Age : ${fire.estimatedFireAge}`
    );

    doc.moveDown(2);

};

export const buildFire = (
    doc,
    report
) => {

    buildFireSection(
        doc,
        report.summary.fire
    );

};