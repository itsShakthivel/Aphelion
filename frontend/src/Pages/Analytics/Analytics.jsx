import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

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

import AnalyticsHeader
    from "../../components/Analytics/Header/AnalyticsHeader";

import AnalyticsDateFilter
    from "../../components/Analytics/Filters/AnalyticsDateFilter";

import AnalyticsSummaryCards
    from "../../components/Analytics/SummaryCards/AnalyticsSummaryCards";

import ExpensePieChart
    from "../../components/Analytics/Charts/ExpensePieChart";

import ExpenseBreakdown
    from "../../components/Analytics/Charts/ExpenseBreakdown";

import MonthlyExpenseTrend
    from "../../components/Analytics/Charts/MonthlyExpenseTrend";

import IncomeBarChart
    from "../../components/Analytics/Charts/IncomeBarCharts";

import CashFlowChart
    from "../../components/Analytics/Charts/CashFlowChart";

import NetWorthCard
    from "../../components/Analytics/NetWorth/NetWorthCard";

import NetWorthTimeline
    from "../../components/Analytics/NetWorth/NetWorthTimeline";

import FinancialHealthCard
    from "../../components/Analytics/FinancialHealth/FinancialHealthCard";

import InsightsSection
    from "../../components/Analytics/InsightCard/InsightsSection";

import FIREPlanner
    from "../../components/fire/FirePlanner";


const Analytics = () => {

    const dispatch = useDispatch();


    // ==========================================
    // Redux
    // ==========================================

    const {

        loading,

        error,

        financialHealth,

        insights,

    } = useSelector(
        (state) => state.analytics
    );


    // ==========================================
    // Fetch Analytics
    // ==========================================

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


    // ==========================================
    // Loading
    // ==========================================

    const isLoading =

        loading.overview ||

        loading.expenseAnalytics ||

        loading.monthlyExpenseTrend ||

        loading.incomeAnalytics ||

        loading.cashFlow ||

        loading.netWorth ||

        loading.netWorthTimeline ||

        loading.financialHealth;


    // ==========================================
    // Error
    // ==========================================

    const firstError =

        error.overview ||

        error.expenseAnalytics ||

        error.monthlyExpenseTrend ||

        error.incomeAnalytics ||

        error.cashFlow ||

        error.netWorth ||

        error.netWorthTimeline ||

        error.financialHealth;


    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="finance-page space-y-10">


                {/* =====================================
                    ANALYTICS HEADER
                ===================================== */}

                <AnalyticsHeader />


                {/* =====================================
                    DATE FILTER
                ===================================== */}

                <AnalyticsDateFilter />


                {/* =====================================
                    SUMMARY CARDS
                ===================================== */}

                <AnalyticsSummaryCards />


                {/* =====================================
                    LOADING
                ===================================== */}

                {isLoading && (

                    <div className="
                        bg-white
                        rounded-xl
                        shadow-md
                        p-8
                        text-center
                    ">

                        <p className="
                            text-gray-500
                            text-lg
                        ">

                            Loading analytics...

                        </p>

                    </div>

                )}


                {/* =====================================
                    ERROR
                ===================================== */}

                {!isLoading && firstError && (

                    <div className="
                        bg-red-50
                        border
                        border-red-200
                        rounded-xl
                        p-6
                    ">

                        <p className="
                            text-red-600
                            font-medium
                        ">

                            {firstError}

                        </p>

                    </div>

                )}


                {/* =====================================
                    ANALYTICS CONTENT
                ===================================== */}

                {!isLoading && !firstError && (

                    <div className="space-y-12">


                        {/* =================================
                            NET WORTH
                        ================================= */}

                        <section className="space-y-6">

                            <h2 className="
                                text-2xl
                                font-bold
                            ">

                                Net Worth

                            </h2>


                            <div className="
                                grid
                                grid-cols-1
                                xl:grid-cols-2
                                gap-6
                            ">

                                <NetWorthCard />

                                <NetWorthTimeline />

                            </div>

                        </section>


                        {/* =================================
                            FINANCIAL HEALTH
                        ================================= */}

                        {financialHealth && (

                            <section className="space-y-6">

                                <h2 className="
                                    text-2xl
                                    font-bold
                                ">

                                    Financial Health

                                </h2>


                                <FinancialHealthCard

                                    data={
                                        financialHealth
                                    }

                                />

                            </section>

                        )}


                        {/* =================================
                            SMART FINANCIAL INSIGHTS
                        ================================= */}

                        <section className="
                            space-y-6
                        ">

                            <InsightsSection

                                insights={
                                    insights || []
                                }

                            />

                        </section>


                        {/* =================================
                            EXPENSE ANALYTICS
                        ================================= */}

                        <section className="space-y-6">

                            <h2 className="
                                text-2xl
                                font-bold
                            ">

                                Expense Analytics

                            </h2>


                            <div className="
                                grid
                                grid-cols-1
                                xl:grid-cols-2
                                gap-6
                            ">

                                <ExpensePieChart />

                                <ExpenseBreakdown />

                            </div>


                            <MonthlyExpenseTrend />

                        </section>


                        {/* =================================
                            INCOME ANALYTICS
                        ================================= */}

                        <section className="space-y-6">

                            <h2 className="
                                text-2xl
                                font-bold
                            ">

                                Income Analytics

                            </h2>


                            <IncomeBarChart />

                        </section>


                        {/* =================================
                            CASH FLOW
                        ================================= */}

                        <section className="space-y-6">

                            <h2 className="
                                text-2xl
                                font-bold
                            ">

                                Cash Flow Analytics

                            </h2>


                            <CashFlowChart />

                        </section>


                        {/* =================================
                            FIRE PLANNER
                        ================================= */}

                        <section className="
                            space-y-6
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                ">

                                    FIRE Planner

                                </h2>


                                <p className="
                                    mt-1
                                    text-gray-500
                                ">

                                    Plan, simulate, and track
                                    your path to financial
                                    independence.

                                </p>

                            </div>


                            <FIREPlanner />

                        </section>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};


export default Analytics;