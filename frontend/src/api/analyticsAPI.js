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

export const getCashFlowAnalytics = (params = {}) => 
    API.get("/analytics/cash-flow", {
        params,
    });

export const getNetWorthAnalytics = (params = {}) =>
    API.get("/analytics/net-worth", {
        params,
    });

export const getNetWorthTimeline = (params = {}) =>
    API.get("/analytics/net-worth/timeline", {
        params,
    });

export const getFinancialHealth = (params = {}) => 
    API.get("/analytics/financial-health", {
        params,
    });

export const getInsights = (params = {}) => 
    API.get("/analytics/insights", {
        params,
    });