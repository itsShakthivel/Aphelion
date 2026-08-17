const InsuranceTransactionOptions = ({
    value,
    onChange,
}) => {

    const options = [
        {
            value: "premium",
            title: "Premium Payment",
            description:
                "Record a premium payment for an insurance policy.",
        },
        {
            value: "policy_expense",
            title: "Policy-Related Expense",
            description:
                "Record an expense associated with an insurance policy.",
        },
    ];

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Insurance Transaction Type

            </label>

            <div className="grid grid-cols-1 gap-2">

                {options.map(
                    (option) => {

                        const selected =
                            value ===
                            option.value;

                        return (

                            <button
                                key={
                                    option.value
                                }
                                type="button"
                                onClick={() =>
                                    onChange(
                                        option.value
                                    )
                                }
                                className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                                    selected
                                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                                        : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                            >

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="font-semibold text-gray-900">

                                            {
                                                option.title
                                            }

                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">

                                            {
                                                option.description
                                            }

                                        </p>

                                    </div>

                                    {selected && (

                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">

                                            ✓

                                        </div>

                                    )}

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>

    );

};

export default InsuranceTransactionOptions;