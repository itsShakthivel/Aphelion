const InvestmentSelector = ({
    investments = [],
    value,
    onChange,
}) => {

    const formatType = (type) => {

        const labels = {
            stock: "Stock",
            mutual_fund: "Mutual Fund",
            etf: "ETF",
            gold: "Gold",
            crypto: "Crypto",
            fd: "Fixed Deposit",
            real_estate: "Real Estate",
            bond: "Bond",
            other: "Other",
        };

        return labels[type] || "Other";
    };

    const formatCategory = (category) => {

        const labels = {
            index_fund: "Index Fund",
            flexicap: "Flexicap",
            large_cap: "Large Cap",
            mid_cap: "Mid Cap",
            small_cap: "Small Cap",
            multicap: "Multicap",
            elss: "ELSS",
            debt: "Debt",
            other: "Other",
        };

        return labels[category] || "Other";
    };

    const formatCurrency = (amount) => {

        return `₹${(
            Number(amount) || 0
        ).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0,
            }
        )}`;
    };

    if (investments.length === 0) {

        return (

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-sm font-semibold text-amber-700">

                    No investments found

                </p>

                <p className="mt-1 text-sm text-amber-600">

                    Add an investment to your portfolio before recording an investment transaction.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Select Investment

            </label>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">

                {investments.map(
                    (investment) => {

                        const isSelected =
                            value ===
                            investment._id;

                        return (

                            <button
                                key={
                                    investment._id
                                }
                                type="button"
                                onClick={() =>
                                    onChange(
                                        investment._id
                                    )
                                }
                                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                                    isSelected
                                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <p className="font-semibold text-gray-900 truncate">

                                            {
                                                investment.name
                                            }

                                        </p>

                                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">

                                            <span>

                                                {
                                                    formatType(
                                                        investment.type
                                                    )
                                                }

                                            </span>

                                            <span>
                                                ·
                                            </span>

                                            <span>

                                                {
                                                    formatCategory(
                                                        investment.category
                                                    )
                                                }

                                            </span>

                                        </div>

                                    </div>

                                    {isSelected && (

                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">

                                            ✓

                                        </div>

                                    )}

                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">

                                    <span className="text-xs text-gray-500">

                                        Invested

                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">

                                        {
                                            formatCurrency(
                                                investment.investedAmount
                                            )
                                        }

                                    </span>

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );

};

export default InvestmentSelector;