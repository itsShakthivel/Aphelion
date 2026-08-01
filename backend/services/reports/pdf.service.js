import PDFDocument from "pdfkit";

import { buildFooter } from "./pdf/components/footer.js";
import { addPageNumbers } from "./pdf/components/pageNumber.js";

import { buildCoverPage } from "./builders/cover.builder.js";
import { buildSummary } from "./builders/summary.builder.js";
import { buildHealth } from "./builders/health.builder.js";
import { buildAnalytics } from "./builders/analytics/analytics.builder.js";
import { buildCharts } from "./builders/charts/charts.builder.js";
import { buildFire } from "./builders/fire.builder.js";
import { buildAI } from "./builders/ai.builder.js";
import { buildSignature } from "./builders/signature.builder.js";

export const generatePDFReport = (report) => {

    return new Promise(async (resolve, reject) => {

        try {

            const doc = new PDFDocument({

                margin: 50,

                size: "A4",

                bufferPages: true,

            });

            const buffers = [];

            doc.on("data", (chunk) => {

                buffers.push(chunk);

            });

            doc.on("end", () => {

                resolve(Buffer.concat(buffers));

            });

            await buildReport(
                doc,
                report
            );

            addPageNumbers(doc);

            doc.end();

        }

        catch (error) {

            reject(error);

        }

    });

};

const buildReport = async (
    doc,
    report
) => {

    // ==========================
    // Cover Page
    // ==========================

    buildCoverPage(
        doc,
        report
    );

    // ==========================
    // Executive Summary
    // ==========================

    buildSummary(
        doc,
        report
    );

    // ==========================
    // Financial Health
    // ==========================

    buildHealth(
        doc,
        report
    );

    // ==========================
    // Analytics
    // ==========================

    buildAnalytics(
        doc,
        report
    );

    // ==========================
    // Charts
    // ==========================

    await buildCharts(
        doc,
        report
    );

    // ==========================
    // FIRE Planner
    // ==========================

    buildFire(
        doc,
        report
    );

    // ==========================
    // AI Insights
    // ==========================

    buildAI(
        doc,
        report
    );

    // ==========================
    // Report Signature
    // ==========================

    buildSignature(
        doc,
        report
    );

    // ==========================
    // Footer
    // ==========================

    buildFooter(doc);

};