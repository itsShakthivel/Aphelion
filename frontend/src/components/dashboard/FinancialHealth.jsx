function FinancialHealth() {
    return (
        <div
            className="
                bg-slate-900
                rounded-2xl
                p-6
                border
                border-slate-800
                mb-6
            "
        >

            <div className="flex justify-between">

                <div>

                    <h3
                        className="
                            text-slate-400
                            text-sm
                        "
                    >
                        Financial Health Score
                    </h3>

                    <h1
                        className="
                            text-5xl
                            font-bold
                            text-emerald-400
                            mt-2
                        "
                    >
                        84
                    </h1>

                    <p className="text-slate-500">
                        Excellent Financial Health
                    </p>

                </div>

                <div
                    className="
                        h-28
                        w-28
                        rounded-full
                        border-8
                        border-emerald-400
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                        text-white
                    "
                >
                    84%
                </div>

            </div>

        </div>
    );
}

export default FinancialHealth;