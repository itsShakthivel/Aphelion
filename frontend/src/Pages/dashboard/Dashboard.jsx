import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchDashboard } from "../../features/dashboard/dashboardSlice";

import DashboardLayout from "../../layouts/DashboardLayout";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import SavingsChart from "../../components/dashboard/SavingsChart";
import NetWorthChart from "../../components/dashboard/NetWorthChart";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import ErrorState from "../../components/common/ErrorState";

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
            <DashboardLayout>
                <DashboardSkeleton />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <ErrorState
                    title="Dashboard Failed"
                    message={error}
                    onRetry={() => dispatch(fetchDashboard())}
                />
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <motion.div 
                initial={{ opacity: 0, y: 20,}}
                animate={{ opacity: 1, y: 0,}}
                transition={{ duration: 0.4}}
            >

                <FinancialHealth data={data} />

                <SummaryCards data={data} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                    <ExpenseChart data={data} />

                    <SavingsChart data={data} />

                </div>

                <NetWorthChart data={data} />

                <DashboardWidgets data={data} />

                <RecentTransactions data={data} />
            </motion.div>

        </DashboardLayout>

    );

}

export default Dashboard;