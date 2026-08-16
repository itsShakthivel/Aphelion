const InvestmentTransactionOptions = ({
    value,
    onChange,
}) => {

    return (

        <div className="space-y-3">

            <label className="block text-sm font-medium text-gray-700">

                Investment Type

            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                    type="button"
                    onClick={() =>
                        onChange("sip")
                    }
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        value === "sip"
                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                            : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                    }`}
                >

                    <div className="font-semibold text-gray-900">

                        SIP

                    </div>

                    <div className="text-sm text-gray-500 mt-1">

                        Recurring investment contribution

                    </div>

                </button>

                <button
                    type="button"
                    onClick={() =>
                        onChange("one_time")
                    }
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                        value === "one_time"
                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                            : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                    }`}
                >

                    <div className="font-semibold text-gray-900">

                        One-Time

                    </div>

                    <div className="text-sm text-gray-500 mt-1">

                        Single investment contribution

                    </div>

                </button>

            </div>

        </div>

    );

};

export default InvestmentTransactionOptions;