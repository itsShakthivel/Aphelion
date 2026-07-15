import API from "./axios";

export const getOverview = (params = {}) =>
    API.get("/analytics/overview", {
        params,
    });

export const getExpenseAnalytics = (params = {}) =>
    API.get("/analytics/expenses", {
        params,
    });

export const getMonthlyExpenseTrend = (params = {}) =>
    API.get("/analytics/expenses/monthly", {
        params,
    });
    
export const getIncomeAnalytics = (params = {}) => 
    API.get("/analytics/income", {
        params,
    });