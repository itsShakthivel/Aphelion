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

const Analytics = () => {

    const dispatch = useDispatch();

    const {
        loading,
        error,
    } = useSelector((state) => state.analytics);

    useEffect(() => {

        dispatch(fetchOverview());

        dispatch(fetchExpenseAnalytics());

        dispatch(fetchMonthlyExpenseTrend());

        dispatch(fetchIncomeAnalytics());

        dispatch(fetchCashFlowAnalytics());

        dispatch(fetchNetWorthAnalytics());

        dispatch(fetchNetWorthTimeline());

    }, [dispatch]);

    const isLoading =

        loading.overview ||

        loading.expenseAnalytics ||

        loading.monthlyExpenseTrend ||

        loading.incomeAnalytics ||

        loading.cashFlow;

    const firstError =

        error.overview ||

        error.expenseAnalytics ||

        error.monthlyExpenseTrend ||

        error.incomeAnalytics ||

        error.cashFlow;

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <AnalyticsHeader />

                {/* Date Filter */}

                <AnalyticsDateFilter />

                {/* Summary Cards */}

                <AnalyticsSummaryCards />

                <NetWorthCard />

                <NetWorthTimeline />

                {/* Analytics Content */}

                {isLoading ? (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">

                        <p className="text-gray-500 text-lg">

                            Loading analytics...

                        </p>

                    </div>

                ) : firstError ? (

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                        <p className="text-red-600 font-medium">

                            {firstError}

                        </p>

                    </div>

                ) : (

                    <div className="space-y-8">

                        {/* ================= Expense Analytics ================= */}

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

                        {/* ================= Income Analytics ================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Income Analytics

                            </h2>

                            <IncomeBarChart />

                        </section>

                        {/* ================= Cash Flow Analytics ================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Cash Flow Analytics

                            </h2>

                            <CashFlowChart />

                        </section>

                        {/* ================= AI Insights ================= */}

                        <section className="space-y-6">

                            <h2 className="text-2xl font-bold">

                                Smart Insights

                            </h2>

                            <div className="bg-white rounded-xl shadow-md h-72 flex items-center justify-center">

                                <p className="text-gray-500">

                                    AI Financial Insights (Coming Soon)

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