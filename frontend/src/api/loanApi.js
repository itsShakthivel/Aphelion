import API from "./axios";

// GET ALL LOANS
export const getLoans = () =>
    API.get("/loans");

// GET SINGLE LOAN
export const getLoan = (id) =>
    API.get(`/loans/${id}`);

// CREATE LOAN
export const createLoan = (data) =>
    API.post("/loans", data);

// UPDATE LOAN
export const updateLoan = (id, data) =>
    API.put(`/loans/${id}`, data);

// DELETE LOAN
export const deleteLoan = (id) =>
    API.delete(`/loans/${id}`);