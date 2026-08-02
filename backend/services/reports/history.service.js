import Report from "../../models/Report.js";
import { generateNotification } from "../notification/notificationGenerator.service.js";

// ============================================
// Save Report
// ============================================

export const saveReport = async (

    userId,

    reportType,

    format

) => {

    const report = await Report.create({

        user: userId,

        reportType,

        format,

    });

    await generateNotification({

        user: userId,

        title: "Financial Report Saved",

        message: `Your ${reportType} report has been generated and saved successfully.`,

        type: "Report",

        priority: "Info",

        action: "View Reports",

        link: "/reports",

        payload: {

            reportId: report._id,

            reportType,

            format,

        },

    });

    return report;

};

// ============================================
// Get Report History
// ============================================

export const getReportHistory = async (

    userId

) => {

    return await Report.find({

        user: userId,

    })

        .sort({

            generatedAt: -1,

        });

};

// ============================================
// Delete Report
// ============================================

export const deleteReport = async (

    reportId,

    userId

) => {

    return await Report.findOneAndDelete({

        _id: reportId,

        user: userId,

    });

};