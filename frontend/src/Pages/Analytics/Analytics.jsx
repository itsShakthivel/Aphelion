import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    fetchOverview,
    fetchExpenseAnalytics,
    fetchMonthlyExpenseTrend,
    fetchIncomeAnalytics,
    fetchCashFlowAnalytics,
    fetchNetWorthAnalytics,
    fetchNetWorthTimeline,
    fetchFinancialHealth,
    fetchInsights,
} from "../../features/analytics/analyticsSlice";

import AnalyticsHeader from "../../components/Analytics/Header/AnalyticsHeader";
import AnalyticsDateFilter from "../../components/Analytics/Filters/AnalyticsDateFilter";
import AnalyticsSummaryCards from "../../components/Analytics/SummaryCards/AnalyticsSummaryCards";

import ExpensePieChart from "../../components/Analytics/Charts/ExpensePieChart";
import ExpenseBreakdown from "../../components/Analytics/Charts/ExpenseBreakdown";
import MonthlyExpenseTrend from "../../components/Analytics/Charts/MonthlyExpenseTrend";
import IncomeBarChart from "../../components/Analytics/Charts/IncomeBarCharts";
import CashFlowChart from "../../components/Analytics/Charts/CashFlowChart";

import NetWorthCard from "../../components/Analytics/NetWorth/NetWorthCard";
import NetWorthTimeline from "../../components/Analytics/NetWorth/NetWorthTimeline";

import FinancialHealthCard from "../../components/Analytics/FinancialHealth/FinancialHealthCard";

const Analytics = () => {

    const dispatch = useDispatch();

    const {

        loading,

        error,

        financialHealth,

        insights,

    } = useSelector((state) => state.analytics);

    useEffect(() => {

        dispatch(fetchOverview());
        dispatch(fetchExpenseAnalytics());
        dispatch(fetchMonthlyExpenseTrend());
        dispatch(fetchIncomeAnalytics());
        dispatch(fetchCashFlowAnalytics());
        dispatch(fetchNetWorthAnalytics());
        dispatch(fetchNetWorthTimeline());
        dispatch(fetchFinancialHealth());
        dispatch(fetchInsights());

    }, [dispatch]);

    const isLoading =

        loading.overview ||

        loading.expenseAnalytics ||

        loading.monthlyExpenseTrend ||

        loading.incomeAnalytics ||

        loading.cashFlow ||

        loading.netWorth ||

        loading.netWorthTimeline ||

        loading.financialHealth;

    const firstError =

        error.overview ||

        error.expenseAnalytics ||

        error.monthlyExpenseTrend ||

        error.incomeAnalytics ||

        error.cashFlow ||

        error.netWorth ||

        error.netWorthTimeline ||

        error.financialHealth;

    return (

        <DashboardLayout>

            <div className="space-y-10">

                {/* ===========================================
                    Header
                =========================================== */}

                <AnalyticsHeader />

                {/* ===========================================
                    Date Filter
                =========================================== */}

                <AnalyticsDateFilter />

                {/* ===========================================
                    Summary Cards
                =========================================== */}

                <AnalyticsSummaryCards />

                {/* ===========================================
                    Loading
                =========================================== */}

                {isLoading && (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">

                        <p className="text-gray-500 text-lg">

                            Loading analytics...

                        </p>

                    </div>

                )}

                {/* ===========================================
                    Error
                =========================================== */}

                {!isLoading && firstError && (

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                        <p className="text-red-600 font-medium">

                            {firstError}

                        </p>

                    </div>

                )}

                {/* ===========================================
                    Analytics Content
                =========================================== */}

                {!isLoading && !firstError && (

                    <div className="space-y-12">

                        {/* =======================================
                            Net Worth
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Net Worth

                            </h2>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                                <NetWorthCard />

                                <NetWorthTimeline />

                            </div>

                        </section>

                        {/* =======================================
                            Financial Health
                        ======================================= */}

                        {financialHealth && (

                            <section className="space-y-6">

                                <h2 className="text-2xl font-bold">

                                    Financial Health

                                </h2>

                                <FinancialHealthCard
                                    data={financialHealth}
                                />

                            </section>

                        )}

                        {/* =======================================
                            Expense Analytics
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Expense Analytics

                            </h2>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                                <ExpensePieChart />

                                <ExpenseBreakdown />

                            </div>

                            <MonthlyExpenseTrend />

                        </section>

                        {/* =======================================
                            Income Analytics
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Income Analytics

                            </h2>

                            <IncomeBarChart />

                        </section>

                        {/* =======================================
                            Cash Flow Analytics
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Cash Flow Analytics

                            </h2>

                            <CashFlowChart />

                        </section>

                        {/* =======================================
                            Smart Insights
                            (Phase 5.2)
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Smart Insights

                            </h2>

                            <div className="bg-white rounded-xl shadow-md h-72 flex items-center justify-center">

                                <p className="text-gray-500 text-lg">

                                    Smart Financial Insights

                                    <br />

                                    Coming Soon 🚀

                                </p>

                            </div>

                        </section>

                        {/* =======================================
                            FIRE Planner
                            (Phase 5.3)
                        ======================================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                FIRE Planner

                            </h2>

                            <div className="bg-white rounded-xl shadow-md h-72 flex items-center justify-center">

                                <p className="text-gray-500 text-lg">

                                    FIRE Planner

                                    <br />

                                    Coming Soon 🚀

                                </p>

                            </div>

                        </section>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};

export default Analytics;