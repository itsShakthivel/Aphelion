import {
    useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import FamilyContributionTrend from "../../components/familyAnalytics/FamilyContributionTrend";

import FamilyExpenseBreakdown from "../../components/familyAnalytics/FamilyExpenseBreakdown";

import FamilyTreasuryGrowth from "../../components/familyAnalytics/FamilyTreasuryGrowth";

import FamilyGoalProgress from "../../components/familyAnalytics/FamilyGoalProgress";

import FamilyInvestmentAllocation from "../../components/familyAnalytics/FamilyInvestmentAllocation";

import FamilyDebtAnalysis from "../../components/familyAnalytics/FamilyDebtAnalysis";

import {

    fetchFamilyAnalyticsOverview,

    fetchContributionTrend,

    fetchFamilyExpenseBreakdown,

    fetchTreasuryGrowth,

    fetchFamilyGoalProgress,

    fetchFamilyInvestmentAllocation,

    fetchFamilyDebtAnalysis,

} from "../../features/familyAnalytics/familyAnalyticsSlice";

const FamilyAnalytics = () => {

    const dispatch = useDispatch();

    const {
        family,
    } = useSelector(
        state => state.family
    );

    const {
        treasury,
    } = useSelector(
        state => state.treasury
    );

    const {
        overview,
        loading,
        error,
    } = useSelector(
        state => state.familyAnalytics
    );

    useEffect(() => {

        if (
            !family ||
            !treasury
        ) {

            return;

        }

        const params = {

            familyId:
                family._id,

            treasuryId:
                treasury._id,

        };

        dispatch(
            fetchFamilyAnalyticsOverview(
                params
            )
        );

        dispatch(
            fetchContributionTrend(
                params
            )
        );

        dispatch(
            fetchFamilyExpenseBreakdown(
                params
            )
        );

        dispatch(
            fetchTreasuryGrowth(
                params
            )
        );

        dispatch(
            fetchFamilyGoalProgress(
                params
            )
        );

        dispatch(
            fetchFamilyInvestmentAllocation(
                params
            )
        );

        dispatch(
            fetchFamilyDebtAnalysis(
                params
            )
        );

    }, [

        dispatch,

        family,

        treasury,

    ]);

    if (loading && !overview) {

        return (

            <DashboardLayout>

                <div className="p-6">

                    Loading Household Analytics...

                </div>

            </DashboardLayout>

        );

    }

    if (error && !overview) {

        return (

            <DashboardLayout>

                <div className="p-6">

                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">

                        {error}

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Household Analytics

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Understand your household's shared financial position.

                    </p>

                </div>

                {/* Summary */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Treasury Balance

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            ₹ {

                                Number(

                                    overview?.treasury?.totalBalance ||

                                    0

                                ).toLocaleString()

                            }

                        </h2>

                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Monthly Contributions

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            ₹ {

                                Number(

                                    overview?.contributions ||

                                    0

                                ).toLocaleString()

                            }

                        </h2>

                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Household Expenses

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            ₹ {

                                Number(

                                    overview?.expenses ||

                                    0

                                ).toLocaleString()

                            }

                        </h2>

                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Outstanding Debt

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            ₹ {

                                Number(

                                    overview?.outstandingDebt ||

                                    0

                                ).toLocaleString()

                            }

                        </h2>

                    </div>

                </div>

                {/* Additional Summary */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Shared Investments

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            ₹ {

                                Number(

                                    overview?.investments ||

                                    0

                                ).toLocaleString()

                            }

                        </h2>

                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Active Goals

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            {

                                overview?.activeGoals ||

                                0

                            }

                        </h2>

                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">

                        <p className="text-sm text-gray-500">

                            Active Insurance

                        </p>

                        <h2 className="text-2xl font-bold mt-2">

                            {

                                overview?.activeInsurance ||

                                0

                            }

                        </h2>

                    </div>

                </div>

                {/* Data Sections */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <FamilyContributionTrend />

                    <FamilyExpenseBreakdown />

                    <FamilyTreasuryGrowth />

                    <FamilyGoalProgress />

                    <FamilyInvestmentAllocation />

                    <FamilyDebtAnalysis />

                </div>
            </div>

        </DashboardLayout>

    );

};

export default FamilyAnalytics;