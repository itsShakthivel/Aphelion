import {
    generateFinancialReport,
    generatePDFReport,
    exportCSVReport,
} from "../services/reportService.js";

import {

    saveReport,

    getReportHistory,

    deleteReport,

} from "../services/reportService.js";

export const downloadPDFReport = async (req, res) => {

    try {

        const report = await generateFinancialReport(

            req.user.id,

            req.query

        );

        const pdfBuffer = await generatePDFReport(report);

        await saveReport(

            req.user.id,

            req.query.reportType || "monthly",

            "pdf"

        );

        res.setHeader(

            "Content-Type",

            "application/pdf"

        );

        res.setHeader(

            "Content-Disposition",

            'attachment; filename="Aphelion_Report.pdf"'

        );

        return res.send(pdfBuffer);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Failed to generate PDF report",

        });

    }

};

export const downloadCSVReport = async (req, res) => {

    try {

        const report = await generateFinancialReport(

            req.user.id,

            req.query

        );

        const type = req.query.type || "overview";

        let csvData = [];

        switch (type) {

            case "expenses":

                csvData = report.analytics.expenseAnalytics;

                break;

            case "income":

                csvData = report.analytics.incomeAnalytics;

                break;

            case "cashflow":

                csvData = report.analytics.cashFlow;

                break;

            case "networth":

                csvData = [report.summary.netWorth];

                break;

            case "fire":

                csvData = [report.summary.fire];

                break;

            default:

                csvData = [report.summary.overview];

        }

        const csv = exportCSVReport(csvData);

        await saveReport(

            req.user.id,

            req.query.reportType || "monthly",

            "csv"

        );

        res.setHeader(

            "Content-Type",

            "text/csv"

        );

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${type}.csv"`

        );

        return res.send(csv);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Failed to export CSV report",

        });

    }

};

export const getReports = async (

    req,

    res

) => {

    try {

        const reports =

            await getReportHistory(

                req.user.id

            );

        return res.json(reports);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message:

                "Failed to fetch report history",

        });

    }

};

export const removeReport = async (

    req,

    res

) => {

    try {

        await deleteReport(

            req.params.id,

            req.user.id

        );

        return res.json({

            message:

                "Report deleted successfully",

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message:

                "Failed to delete report",

        });

    }

};