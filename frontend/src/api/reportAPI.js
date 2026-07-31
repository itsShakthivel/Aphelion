import API from "./axios";

export const downloadPDFReport = (params = {}) =>
    API.get("/reports/pdf", {
        params,
        responseType: "blob",
    });

export const downloadCSVReport = (params = {}) =>
    API.get("/reports/csv", {
        params,
        responseType: "blob",
    });