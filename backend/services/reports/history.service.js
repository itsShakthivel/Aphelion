import Report from "../../models/Report.js";

export const saveReport = async (

    userId,

    reportType,

    format

) => {

    return await Report.create({

        user: userId,

        reportType,

        format,

    });

};

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

export const deleteReport = async (

    reportId,

    userId

) => {

    return await Report.findOneAndDelete({

        _id: reportId,

        user: userId,

    });

};