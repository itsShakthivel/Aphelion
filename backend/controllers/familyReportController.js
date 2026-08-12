import {
    generateFamilyPDFReport,
} from "../services/reports/familyPDF.service.js";

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

        res.send(buffer);

    }

    catch (error) {

        return res.status(500).json({

            message:
                error.message,

        });

    }

};