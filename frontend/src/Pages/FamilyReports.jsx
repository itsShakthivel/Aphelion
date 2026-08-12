import {
    useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout
    from "../layouts/DashboardLayout";

import {
    generateFamilyReport,
    resetFamilyReportState,
} from "../features/familyReport/familyReportSlice";

const FamilyReports = () => {

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
        loading,
        success,
        error,
    } = useSelector(
        state => state.familyReport
    );

    // ============================================
    // Reset State
    // ============================================

    useEffect(() => {

        return () => {

            dispatch(
                resetFamilyReportState()
            );

        };

    }, [dispatch]);

    // ============================================
    // Generate Report
    // ============================================

    const handleGenerateReport = async () => {

        if (
            !family ||
            !treasury
        ) {

            return;

        }

        try {

            const result =
                await dispatch(

                    generateFamilyReport({

                        familyId:
                            family._id,

                        treasuryId:
                            treasury._id,

                    })

                ).unwrap();

            const blob =
                new Blob(

                    [result],

                    {

                        type:
                            "application/pdf",

                    }

                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =

                `${family.name
                    .replace(
                        /[^a-z0-9]/gi,
                        "_"
                    )}_Household_Report.pdf`;

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

            window.URL.revokeObjectURL(
                url
            );

        }

        catch (error) {

            console.error(
                "Household report generation failed:",
                error
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Household Reports

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Generate a complete financial report for your household treasury.

                    </p>

                </div>

                {/* Report Card */}

                <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8">

                    <div className="max-w-3xl">

                        <h2 className="text-2xl font-semibold">

                            Household Financial Report

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Generate a PDF containing your household treasury,
                            contributions, goals, investments, debt, insurance,
                            buckets, and financial analytics.

                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                            <div className="border rounded-lg p-4">

                                <p className="text-sm text-gray-500">

                                    Household

                                </p>

                                <p className="font-semibold mt-1">

                                    {family?.name || "No household"}

                                </p>

                            </div>

                            <div className="border rounded-lg p-4">

                                <p className="text-sm text-gray-500">

                                    Treasury Balance

                                </p>

                                <p className="font-semibold mt-1">

                                    ₹ {

                                        Number(

                                            treasury?.totalBalance ||

                                            0

                                        ).toLocaleString()

                                    }

                                </p>

                            </div>

                        </div>

                        {/* Contents */}

                        <div className="mt-8">

                            <h3 className="font-semibold">

                                Report includes

                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

                                <div className="border rounded-lg p-3">

                                    Treasury

                                </div>

                                <div className="border rounded-lg p-3">

                                    Contributions

                                </div>

                                <div className="border rounded-lg p-3">

                                    Goals

                                </div>

                                <div className="border rounded-lg p-3">

                                    Investments

                                </div>

                                <div className="border rounded-lg p-3">

                                    Debt

                                </div>

                                <div className="border rounded-lg p-3">

                                    Insurance

                                </div>

                                <div className="border rounded-lg p-3">

                                    Analytics

                                </div>

                                <div className="border rounded-lg p-3">

                                    Household AI Summary

                                </div>

                            </div>

                        </div>

                        {/* Error */}

                        {error && (

                            <div className="mt-6 bg-red-50 text-red-600 rounded-lg p-4">

                                {error}

                            </div>

                        )}

                        {/* Success */}

                        {success && !loading && (

                            <div className="mt-6 bg-green-50 text-green-600 rounded-lg p-4">

                                Household report generated successfully.

                            </div>

                        )}

                        {/* Generate */}

                        <div className="mt-8">

                            <button

                                onClick={
                                    handleGenerateReport
                                }

                                disabled={

                                    loading ||

                                    !family ||

                                    !treasury

                                }

                                className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"

                            >

                                {loading

                                    ? "Generating Report..."

                                    : "Generate Household PDF"

                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default FamilyReports;