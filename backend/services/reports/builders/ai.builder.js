import { sectionTitle } from "../pdf/components/section.js";

const buildAIRecommendations = (
    doc,
    insights
) => {

    doc.addPage();

    sectionTitle(
        doc,
        "AI Financial Recommendations"
    );

    if (!insights.length) {

        doc.text(
            "No recommendations available."
        );

        return;

    }

    insights.slice(0, 5).forEach(

        (item, index) => {

            doc

                .fontSize(12)

                .text(

                    `${index + 1}. ${item.title}`

                );

            doc

                .fontSize(11)

                .fillColor("#6b7280")

                .text(

                    item.recommendation

                );

            doc.moveDown();

        }

    );

};

export const buildAI = (
    doc,
    report
) => {

    buildAIRecommendations(
        doc,
        report.summary.insights
    );

};