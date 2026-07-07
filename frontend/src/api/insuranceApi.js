import API from "./axios";

// GET ALL INSURANCE POLICIES
export const getInsurances = () =>
    API.get("/insurance");

// GET SINGLE INSURANCE
export const getInsurance = (id) =>
    API.get(`/insurance/${id}`);

// CREATE INSURANCE
export const createInsurance = (data) =>
    API.post("/insurance", data);

// UPDATE INSURANCE
export const updateInsurance = (id, data) =>
    API.put(`/insurance/${id}`, data);

// DELETE INSURANCE
export const deleteInsurance = (id) =>
    API.delete(`/insurance/${id}`);