import { useEffect, useState } from "react";

import API from "../../api/axios";

const InsuranceSelector = ({
    value,
    onChange,
}) => {

    const [
        insurances,
        setInsurances,
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

        const loadInsurance =
            async () => {

                try {

                    setLoading(true);

                    setError("");

                    const response =
                        await API.get(
                            "/insurance"
                        );

                    if (mounted) {

                        setInsurances(
                            response.data || []
                        );

                    }

                } catch (error) {

                    if (mounted) {

                        setError(
                            error.response?.data?.message ||
                            "Failed to load insurance policies."
                        );

                    }

                } finally {

                    if (mounted) {

                        setLoading(false);

                    }

                }

            };

        loadInsurance();

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

                    Loading insurance policies...

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

    if (insurances.length === 0) {

        return (

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-sm font-semibold text-amber-700">

                    No insurance policies found

                </p>

                <p className="mt-1 text-sm text-amber-600">

                    Add an insurance policy before recording an insurance transaction.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Select Insurance Policy

            </label>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">

                {insurances.map(
                    (insurance) => {

                        const selected =
                            value ===
                            insurance._id;

                        return (

                            <button
                                key={
                                    insurance._id
                                }
                                type="button"
                                onClick={() =>
                                    onChange(
                                        insurance._id
                                    )
                                }
                                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                                    selected
                                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <p className="font-semibold text-gray-900 truncate">

                                            {
                                                insurance.policyName
                                            }

                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">

                                            {
                                                insurance.provider
                                            }

                                        </p>

                                    </div>

                                    {selected && (

                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">

                                            ✓

                                        </div>

                                    )}

                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Premium

                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">

                                            {
                                                formatCurrency(
                                                    insurance.premium
                                                )
                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Coverage

                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">

                                            {
                                                formatCurrency(
                                                    insurance.coverage
                                                )
                                            }

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-2 text-xs text-gray-500">

                                    {
                                        insurance.type
                                    }

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );

};

export default InsuranceSelector;