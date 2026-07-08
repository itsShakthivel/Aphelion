import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboard } from "../../features/dashboard/dashboardSlice";

import DashboardLayout from "../../layouts/DashboardLayout";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import SavingsChart from "../../components/dashboard/SavingsChart";
import NetWorthChart from "../../components/dashboard/NetWorthChart";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

function Dashboard() {

    const dispatch = useDispatch();

    const {
        data,
        loading,
        error,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {

        dispatch(fetchDashboard());

    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading Dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
                {error}
            </div>
        );
    }

    return (

        <DashboardLayout>

            <FinancialHealth data={data} />

            <SummaryCards data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <ExpenseChart data={data} />

                <SavingsChart data={data} />

            </div>

            <NetWorthChart data={data} />

            <DashboardWidgets data={data} />

            <RecentTransactions data={data} />

        </DashboardLayout>

    );

}

export default Dashboard;