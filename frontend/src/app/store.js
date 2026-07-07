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

    },

});

export default store;