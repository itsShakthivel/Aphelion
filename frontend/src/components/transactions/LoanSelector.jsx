import { useEffect, useState } from "react";

import API from "../../api/axios";

const LoanSelector = ({
    value,
    onChange,
}) => {

    const [
        loans,
        setLoans,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    useEffect(() => {

        let mounted = true;

        const loadLoans = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await API.get(
                        "/loans"
                    );

                if (mounted) {

                    setLoans(
                        response.data || []
                    );

                }

            } catch (error) {

                if (mounted) {

                    setError(
                        error.response?.data?.message ||
                        "Failed to load loans."
                    );

                }

            } finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        };

        loadLoans();

        return () => {

            mounted = false;

        };

    }, []);

    const formatCurrency = (
        amount
    ) => {

        return `₹${(
            Number(amount) || 0
        ).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0,
            }
        )}`;

    };

    if (loading) {

        return (

            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">

                <p className="text-sm text-gray-500">

                    Loading loans...

                </p>

            </div>

        );

    }

    if (error) {

        return (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                <p className="text-sm text-red-600">

                    {
                        error
                    }

                </p>

            </div>

        );

    }

    if (loans.length === 0) {

        return (

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-sm font-semibold text-amber-700">

                    No loans found

                </p>

                <p className="mt-1 text-sm text-amber-600">

                    Add a loan before recording a loan transaction.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Select Loan

            </label>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">

                {loans.map(
                    (loan) => {

                        const selected =
                            value ===
                            loan._id;

                        return (

                            <button
                                key={
                                    loan._id
                                }
                                type="button"
                                onClick={() =>
                                    onChange(
                                        loan._id
                                    )
                                }
                                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                                    selected
                                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                                }`}
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <p className="font-semibold text-gray-900 truncate">

                                            {
                                                loan.loanName
                                            }

                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">

                                            {
                                                loan.lender
                                            }

                                        </p>

                                    </div>

                                    {selected && (

                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">

                                            ✓

                                        </div>

                                    )}

                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Outstanding

                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">

                                            {
                                                formatCurrency(
                                                    loan.outstandingAmount
                                                )
                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            EMI

                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">

                                            {
                                                formatCurrency(
                                                    loan.emi
                                                )
                                            }

                                        </p>

                                    </div>

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );

};

export default LoanSelector;