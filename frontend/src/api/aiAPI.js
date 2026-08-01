import API from "./axios";

// =========================
// Financial Profile
// =========================

export const getFinancialProfile = async () => {
    const { data } = await API.get("/ai/profile");
    return data;
};

// =========================
// Financial Behaviour
// =========================

export const getFinancialBehavior = async () => {
    const { data } = await API.get("/ai/behavior");
    return data;
};

// =========================
// Spending
// =========================

export const getSpendingPattern = async () => {
    const { data } = await API.get("/ai/spending");
    return data;
};

// =========================
// Income
// =========================

export const getIncomePattern = async () => {
    const { data } = await API.get("/ai/income");
    return data;
};

// =========================
// Investment
// =========================

export const getInvestmentPattern = async () => {
    const { data } = await API.get("/ai/investments");
    return data;
};

// =========================
// Debt
// =========================

export const getDebtPattern = async () => {
    const { data } = await API.get("/ai/debt");
    return data;
};

// =========================
// Savings
// =========================

export const getSavingsPattern = async () => {
    const { data } = await API.get("/ai/savings");
    return data;
};

// =========================
// Financial Twin
// =========================

export const getFinancialTwin = async () => {
    const { data } = await API.get("/ai/twin");
    return data;
};