import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import ReportsHeader from "../../components/reports/ReportsHeader";
import ReportsSummaryCards from "../../components/reports/ReportsSummaryCards";
import GenerateReportCard from "../../components/reports/GenerateReportCard";
import ExportCSVCard from "../../components/reports/ExportCSVCard";
import ReportsHistoryTable from "../../components/reports/ReportHistoryTable";

import AIExecutiveSummary from "../../components/reports/AIExecutiveSummary";
import FinancialHealthSection from "../../components/reports/FinancialHealthSection";
import RiskAnalysisSection from "../../components/reports/RiskAnalysisSection";
import RecommendationSection from "../../components/reports/RecommendationSection";
import ForecastSection from "../../components/reports/ForecastSection";
import ActionPlanSection from "../../components/reports/ActionPlanSection";

import { fetchAIReport } from "../../features/aiReport/aiReportSlice";

const Reports = () => {

    const dispatch = useDispatch();

    const {

        report,

        loading,

        error,

    } = useSelector(

        (state) => state.aiReport

    );

    useEffect(() => {

        dispatch(fetchAIReport());

    }, [dispatch]);

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* ========================================= */}
                {/* Existing Reports */}
                {/* ========================================= */}

                <ReportsHeader />

                <ReportsSummaryCards />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <GenerateReportCard />

                    <ExportCSVCard />

                </div>

                <ReportsHistoryTable />

                {/* ========================================= */}
                {/* AI Financial Report */}
                {/* ========================================= */}

                {loading && (

                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-10 text-center">

                        <p className="text-lg">

                            Generating AI Financial Report...

                        </p>

                    </div>

                )}

                {error && (

                    <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-6">

                        {error}

                    </div>

                )}

                {report && (

                    <div className="space-y-8">

                        <AIExecutiveSummary

                            summary={report.executiveSummary}

                        />

                        <FinancialHealthSection

                            health={report.financialHealth}

                        />

                        <RiskAnalysisSection

                            report={report}

                        />

                        <RecommendationSection

                            recommendations={report.recommendations}

                        />

                        <ForecastSection

                            forecast={report.forecast}

                        />

                        <ActionPlanSection

                            actions={report.actionPlan}

                        />

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};

export default Reports;