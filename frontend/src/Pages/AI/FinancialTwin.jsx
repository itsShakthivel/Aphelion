import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { fetchFinancialTwin } from "../../features/ai/aiSlice";

import TwinHeader from "../../components/ai/TwinHeader";
import TwinScoreCard from "../../components/ai/TwinScoreCard";
import TwinSummaryCard from "../../components/ai/TwinSummaryCard";
import FinancialPersonality from "../../components/ai/FinancialPersonality";
import TwinOverview from "../../components/ai/TwinOverview";
import SpendingPersonality from "../../components/ai/SpendingPersonality";
import IncomeStability from "../../components/ai/IncomeStability";
import InvestmentProfile from "../../components/ai/InvestmentProfile";
import SavingsAnalysis from "../../components/ai/SavingsAnalysis";
import DebtAnalysis from "../../components/ai/DebtAnalysis";

const FinancialTwin = () => {

    const dispatch = useDispatch();

    const {

        twin,

        loading,

        error,

    } = useSelector((state) => state.ai);

    useEffect(() => {

        dispatch(fetchFinancialTwin());

    }, [dispatch]);

    if (loading)
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    Loading Financial Twin...
                </div>
            </DashboardLayout>
        );

    if (error)
        return (
            <DashboardLayout>
                <div className="text-red-500 text-center py-20">
                    {error}
                </div>
            </DashboardLayout>
        );

    if (!twin)
        return null;

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <TwinHeader />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <TwinScoreCard
                        score={twin.score}
                        grade={twin.grade}
                        risk={twin.risk}
                    />

                    <FinancialPersonality
                        personality={twin.personality}
                    />

                </div>

                <TwinSummaryCard
                    summary={twin.summary}
                />

                <TwinOverview
                    profile={twin.profile}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <SpendingPersonality
                        data={twin.behavior.spending}
                    />

                    <IncomeStability
                        data={twin.behavior.income}
                    />

                    <InvestmentProfile
                        data={twin.behavior.investment}
                    />

                    <SavingsAnalysis
                        data={twin.behavior.savings}
                    />

                </div>

                <DebtAnalysis
                    data={twin.behavior.debt}
                />

            </div>

        </DashboardLayout>

    );

};

export default FinancialTwin;