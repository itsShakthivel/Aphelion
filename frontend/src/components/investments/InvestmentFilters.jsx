const InvestmentFilters = ({
    search,
    setSearch,
    type,
    setType,
    sortBy,
}) => {

    return (

        <div
            className="
                rounded-2xl
                border
                border-white/50
                bg-white/60
                p-4
                shadow-sm
                backdrop-blur-xl
            "
        >

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    lg:grid-cols-2
                "
            >

                {/* ==================================================
                    SEARCH
                ================================================== */}

                <div
                    className="
                        lg:col-span-2
                    "
                >

                    <input
                        type="text"
                        placeholder="Search investments..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200/80
                            bg-white/70
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:bg-white/90
                            focus:ring-2
                            focus:ring-emerald-100
                        "
                    />

                </div>


                {/* ==================================================
                    TYPE
                ================================================== */}

                <select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200/80
                        bg-white/70
                        px-4
                        py-2.5
                        text-sm
                        text-slate-700
                        outline-none
                        transition
                        focus:border-emerald-400
                        focus:bg-white/90
                        focus:ring-2
                        focus:ring-emerald-100
                    "
                >

                    <option value="">
                        All Types
                    </option>

                    <option value="stock">
                        Stock
                    </option>

                    <option value="mutual_fund">
                        Mutual Fund
                    </option>

                    <option value="etf">
                        ETF
                    </option>

                    <option value="gold">
                        Gold
                    </option>

                    <option value="crypto">
                        Crypto
                    </option>

                    <option value="fd">
                        Fixed Deposit
                    </option>

                    <option value="real_estate">
                        Real Estate
                    </option>

                    <option value="bond">
                        Bond
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>


                {/* ==================================================
                    SORT
                ================================================== */}

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200/80
                        bg-white/70
                        px-4
                        py-2.5
                        text-sm
                        text-slate-700
                        outline-none
                        transition
                        focus:border-emerald-400
                        focus:bg-white/90
                        focus:ring-2
                        focus:ring-emerald-100
                    "
                >

                    <option value="latest">
                        Latest
                    </option>

                    <option value="nameAsc">
                        Name A-Z
                    </option>

                    <option value="nameDesc">
                        Name Z-A
                    </option>

                    <option value="profit">
                        Highest Profit
                    </option>

                    <option value="roi">
                        Highest ROI
                    </option>

                </select>

            </div>

        </div>

    );

};


export default InvestmentFilters;