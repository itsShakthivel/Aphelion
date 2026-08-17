const LoanTransactionOptions = ({
    value,
    onChange,
}) => {

    const options = [
        {
            value: "disbursement",
            title: "Loan Disbursement",
            description:
                "Record money received from the lender.",
        },
        {
            value: "emi",
            title: "EMI Payment",
            description:
                "Record a regular loan EMI payment.",
        },
        {
            value: "principal",
            title: "Principal Repayment",
            description:
                "Record a payment specifically reducing principal.",
        },
        {
            value: "interest",
            title: "Interest Payment",
            description:
                "Record an interest-only payment.",
        },
    ];

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Loan Transaction Type

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
                                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
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

                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">

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

export default LoanTransactionOptions;