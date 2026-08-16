import multer from "multer";


// ======================================================
// MEMORY STORAGE
// ======================================================
//
// We don't need to permanently store the uploaded Excel
// file on the server.
//
// The file stays in memory, gets parsed, and is discarded.
//

const storage = multer.memoryStorage();


// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {

    const allowedMimeTypes = [

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "application/vnd.ms-excel",

    ];


    const allowedExtensions = [

        ".xlsx",

        ".xls",

    ];


    const fileName =
        file.originalname.toLowerCase();


    const hasValidExtension =
        allowedExtensions.some(
            (extension) =>
                fileName.endsWith(extension)
        );


    const hasValidMimeType =
        allowedMimeTypes.includes(
            file.mimetype
        );


    if (
        hasValidExtension ||
        hasValidMimeType
    ) {

        cb(null, true);

        return;

    }


    cb(
        new Error(
            "Only Excel files (.xlsx or .xls) are allowed."
        )
    );

};


// ======================================================
// MULTER INSTANCE
// ======================================================

const uploadInvestmentFile = multer({

    storage,

    fileFilter,

    limits: {

        // 10 MB maximum

        fileSize: 10 * 1024 * 1024,

    },

});


export default uploadInvestmentFile;