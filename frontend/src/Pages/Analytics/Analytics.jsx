import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { fetchExpenseAnalytics, fetchIncomeAnalytics, fetchMonthlyExpenseTrend, fetchOverview } from "../../features/analytics/analyticsSlice";

import AnalyticsHeader from "../../components/Analytics/Header/AnalyticsHeader";
import AnalyticsDateFilter from "../../components/Analytics/Filters/AnalyticsDateFilter";
import AnalyticsSummaryCards from "../../components/Analytics/SummaryCards/AnalyticsSummaryCards";
import ExpensePieChart from "../../components/Analytics/Charts/ExpensePieChart";
import ExpenseBreakdown from "../../components/Analytics/Charts/ExpenseBreakdown";
import MonthlyExpenseTrend from "../../components/Analytics/Charts/MonthlyExpenseTrend";
import IncomeBarChart from "../../components/Analytics/Charts/IncomeBarCharts";

const Analytics = () => {

    const dispatch = useDispatch();

    const {
        loading,
        error,
    } = useSelector((state) => state.analytics);

    useEffect(() => {
        dispatch(fetchOverview());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchOverview());
        dispatch(fetchExpenseAnalytics());
        dispatch(fetchMonthlyExpenseTrend());
        dispatch(fetchIncomeAnalytics());
    }, [dispatch]);

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <AnalyticsHeader />

                {/* Date Filter */}

                <AnalyticsDateFilter />

                {/* Summary Cards */}

                <AnalyticsSummaryCards />

                {/* Analytics Content */}

                {loading ? (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">

                        <p className="text-gray-500">
                            Loading analytics...
                        </p>

                    </div>

                ) : error ? (

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                        <p className="text-red-600">
                            {error}
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {/* Expense Analytics */}

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <ExpensePieChart />

                            <ExpenseBreakdown />

                        </div>

                        <MonthlyExpenseTrend />

                        <IncomeBarChart />

                        {/* Cash Flow */}

                        <div className="bg-white rounded-xl shadow-md h-96 flex items-center justify-center">

                            <p className="text-gray-500">
                                Cash Flow Chart
                            </p>

                        </div>

                        {/* Smart Insights */}

                        <div className="bg-white rounded-xl shadow-md h-72 flex items-center justify-center">

                            <p className="text-gray-500">
                                AI Financial Insights
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};

export default Analytics;