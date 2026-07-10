import API from "./axios";

export const getTransactions = () =>
    API.get("/transactions");

export const getTransaction = (id) =>
    API.get(`/transactions/${id}`);

export const createTransaction = (data) =>
    API.post("/transactions", data);

export const updateTransaction = (id, data) =>
    API.put(`/transactions/${id}`, data);

export const deleteTransaction = (id) =>
    API.delete(`/transactions/${id}`);