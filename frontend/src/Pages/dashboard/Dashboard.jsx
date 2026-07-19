import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchDashboard } from "../../features/dashboard/dashboardSlice";
import AnimatedSection from "../../animations/AnimatedSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import SavingsChart from "../../components/dashboard/SavingsChart";
import NetWorthChart from "../../components/dashboard/NetWorthChart";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import ErrorState from "../../components/ui/ErrorState";

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

            <AnimatedSection>

                <FinancialHealth data={data} />

            </AnimatedSection>

            <AnimatedSection delay={0.1}>

                <SummaryCards data={data} />

            </AnimatedSection>

            <AnimatedSection delay={0.2}>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                    <ExpenseChart data={data} />

                    <SavingsChart data={data} />

                </div>

            </AnimatedSection>

            <AnimatedSection delay={0.3}>

                <NetWorthChart data={data} />

            </AnimatedSection>

            <AnimatedSection delay={0.4}>

                <DashboardWidgets data={data} />

            </AnimatedSection>

            <AnimatedSection delay={0.5}>

                <RecentTransactions data={data} />

            </AnimatedSection>

        </DashboardLayout>

    );

}

export default Dashboard;