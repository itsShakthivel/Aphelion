const InvestmentFilters = ({
    search,
    setSearch,
    type,
    setType,
    sortBy,
    setSortBy,
}) => {

    return (

        <div
            className="
                rounded-2xl
                border
                border-white/[0.04]
                bg-[#0b1428]
                p-4
                shadow-lg
                shadow-black/10
            "
        >

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    md:grid-cols-2
                "
            >

                {/* ==================================================
                    SEARCH
                ================================================== */}

                <div
                    className="
                        md:col-span-2
                    "
                >

                    <input
                        type="text"
                        placeholder="Search investments..."
                        value={
                            search
                        }
                        onChange={(
                            event
                        ) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-white/[0.06]
                            bg-[#071126]
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-slate-500
                            transition
                            focus:border-blue-500/40
                            focus:ring-2
                            focus:ring-blue-500/10
                        "
                    />

                </div>


                {/* ==================================================
                    TYPE
                ================================================== */}

                <select
                    value={
                        type
                    }
                    onChange={(
                        event
                    ) =>
                        setType(
                            event.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-[#071126]
                        px-4
                        py-3
                        text-sm
                        text-slate-300
                        outline-none
                        transition
                        focus:border-blue-500/40
                        focus:ring-2
                        focus:ring-blue-500/10
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
                    value={
                        sortBy
                    }
                    onChange={(
                        event
                    ) =>
                        setSortBy(
                            event.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-[#071126]
                        px-4
                        py-3
                        text-sm
                        text-slate-300
                        outline-none
                        transition
                        focus:border-blue-500/40
                        focus:ring-2
                        focus:ring-blue-500/10
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