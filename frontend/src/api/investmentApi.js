import API from "./axios";

// GET ALL INVESTMENTS
export const getInvestments = () =>
    API.get("/investments");

// GET SINGLE INVESTMENT
export const getInvestment = (id) =>
    API.get(`/investments/${id}`);

// CREATE INVESTMENT
export const createInvestment = (data) =>
    API.post("/investments", data);

// UPDATE INVESTMENT
export const updateInvestment = (id, data) =>
    API.put(`/investments/${id}`, data);

// DELETE INVESTMENT
export const deleteInvestment = (id) =>
    API.delete(`/investments/${id}`);