import DashboardLayout from "../../layouts/DashboardLayout"

import ReportsHeader from "../../components/reports/ReportsHeader";
import ReportsSummaryCards from "../../components/reports/ReportsSummaryCards";
import GenerateReportCard from "../../components/reports/GenerateReportCard";
import ExportCSVCard from "../../components/reports/ExportCSVCard";
import ReportsHistoryTable from "../../components/reports/ReportHistoryTable";

const Reports = () => {

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <ReportsHeader />

                <ReportsSummaryCards />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <GenerateReportCard />

                    <ExportCSVCard />

                </div>

                <ReportsHistoryTable />

            </div>

        </DashboardLayout>

    );

};

export default Reports;