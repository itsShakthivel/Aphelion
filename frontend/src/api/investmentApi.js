import API from "./axios";


// ======================================================
// GET ALL INVESTMENTS
// ======================================================

export const getInvestments = () =>
    API.get(
        "/investments"
    );


// ======================================================
// GET SINGLE INVESTMENT
// ======================================================

export const getInvestment = (
    id
) =>
    API.get(
        `/investments/${id}`
    );


// ======================================================
// CREATE INVESTMENT
// ======================================================

export const createInvestment = (
    data
) =>
    API.post(
        "/investments",
        data
    );


// ======================================================
// UPDATE INVESTMENT
// ======================================================

export const updateInvestment = (
    id,
    data
) =>
    API.put(
        `/investments/${id}`,
        data
    );


// ======================================================
// DELETE INVESTMENT
// ======================================================

export const deleteInvestment = (
    id
) =>
    API.delete(
        `/investments/${id}`
    );


// ======================================================
// PREVIEW ANGEL ONE XLSX IMPORT
// ======================================================
//
// Sends the Excel file to the backend.
//
// Backend:
// POST /investments/import/angel-one
//
// IMPORTANT:
// The backend expects the multipart field name:
// "file"
// ======================================================

export const previewAngelOneImport = (
    file
) => {

    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    return API.post(

        "/investments/import/angel-one",

        formData,

        {
            headers: {

                "Content-Type":
                    "multipart/form-data",

            },

        }

    );

};


// ======================================================
// CONFIRM ANGEL ONE IMPORT
// ======================================================
//
// Sends the holdings returned from the preview step.
//
// Backend:
// POST /investments/import/angel-one/confirm
// ======================================================

export const confirmAngelOneImport = (
    holdings
) => {

    return API.post(

        "/investments/import/angel-one/confirm",

        {
            holdings,
        }

    );

};