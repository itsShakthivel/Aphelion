import {
    generateFamilyPDFReport,
} from "../services/reports/familyPDF.service.js";

import {
    notifyFamilyReport,
} from "../services/notification/familyNotification.service.js";

// ============================================
// Generate Household PDF
// ============================================

export const generateFamilyPDF = async (

    req,

    res

) => {

    try {

        const {

            familyId,

            treasuryId,

        } = req.query;

        if (!familyId) {

            return res.status(400).json({

                message:
                    "Family ID is required.",

            });

        }

        if (!treasuryId) {

            return res.status(400).json({

                message:
                    "Treasury ID is required.",

            });

        }

        const {

            buffer,

            report,

        } = await generateFamilyPDFReport(

            req.user.id,

            familyId,

            treasuryId

        );

        // ========================================
        // Household Report Notification
        // ========================================

        await notifyFamilyReport(

            familyId,

            `${report.family.name} Household Report`

        );

        // ========================================
        // PDF Response
        // ========================================

        res.setHeader(

            "Content-Type",

            "application/pdf"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${report.family.name.replace(
                /[^a-z0-9]/gi,
                "_"
            )}_Household_Report.pdf"`

        );

        return res.send(buffer);

    }

    catch (error) {

        return res.status(500).json({

            message:
                error.message,

        });

    }

};