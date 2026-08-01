import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import categoryReducer from "../features/category/categorySlice";
import investmentReducer from "../features/investment/investmentSlice";
import insuranceReducer from "../features/insurance/insuranceSlice";
import loanReducer from "../features/loan/loanSlice";
import retirementReducer from "../features/retirement/retirementSlice";
import goalReducer from "../features/goal/goalSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import fireReducer from "../features/fire/fireSlice";
import reportReducer from "../features/reports/reportSlice";
import aiReducer from "../features/ai/aiSlice";
import recommendationReducer from "../features/recommendations/recommendationSlice";
import forecastReducer from "../features/forecast/forecastService";
import aiReportReducer from "../features/aiReport/aiReportSlice";


export const store = configureStore({

    reducer: {

        auth: authReducer,

        dashboard: dashboardReducer,

        transaction: transactionReducer,

        category: categoryReducer,

        investment: investmentReducer,

        insurance: insuranceReducer,

        loan: loanReducer,

        retirement: retirementReducer,

        goal: goalReducer,

        analytics: analyticsReducer,
        
        fire: fireReducer,

        reports: reportReducer,

        ai: aiReducer,

        recommendations: recommendationReducer,

        forecast: forecastReducer,

        aiReport: aiReportReducer,

    },

});

export default store;