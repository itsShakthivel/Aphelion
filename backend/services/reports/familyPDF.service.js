import PDFDocument from "pdfkit";

import {
    generateFamilyReportService,
} from "./familyReport.service.js";

import {
    buildFamilyReport,
} from "./pdf/familyReport.builder.js";

// ============================================
// Generate Household PDF
// ============================================

export const generateFamilyPDFReport = async (

    userId,

    familyId,

    treasuryId

) => {

    const report =
        await generateFamilyReportService(

            userId,

            familyId,

            treasuryId

        );

    return new Promise(

        (

            resolve,

            reject

        ) => {

            try {

                const doc =
                    new PDFDocument({

                        size:
                            "A4",

                        margin:
                            50,

                    });

                const chunks = [];

                doc.on(

                    "data",

                    chunk => {

                        chunks.push(
                            chunk
                        );

                    }

                );

                doc.on(

                    "end",

                    () => {

                        const pdfBuffer =
                            Buffer.concat(
                                chunks
                            );

                        resolve({

                            buffer:
                                pdfBuffer,

                            report,

                        });

                    }

                );

                doc.on(

                    "error",

                    reject

                );

                buildFamilyReport(

                    doc,

                    report

                );

                doc.end();

            }

            catch (error) {

                reject(error);

            }

        }

    );

};