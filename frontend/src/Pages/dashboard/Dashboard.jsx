import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import SavingsChart from "../../components/dashboard/SavingsChart";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import SummaryCards from "../../components/dashboard/SummaryCards";
import NetWorthChart from "../../components/dashboard/NetWorthChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";

function Dashboard() {
  return (
    <DashboardLayout>
        <FinancialHealth />
        <SummaryCards />
        <div className="grid grid-col-2 gap-6">
            <ExpenseChart />
            <SavingsChart />
        </div>
        <NetWorthChart />
        <DashboardWidgets />
        <RecentTransactions />
    </DashboardLayout>
  );
}



export default Dashboard;