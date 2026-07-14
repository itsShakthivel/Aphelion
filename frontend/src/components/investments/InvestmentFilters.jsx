const InvestmentFilters = ({
    search,
    setSearch,
    type,
    setType,
    sortBy,
    setSortBy,
    onAdd,
}) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-4">

            <div className="flex flex-col lg:flex-row gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search investments..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 border rounded-lg px-4 py-2"
                />

                {/* Type */}

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
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

                    <option value="gold">
                        Gold
                    </option>

                    <option value="crypto">
                        Crypto
                    </option>

                    <option value="fd">
                        Fixed Deposit
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

                {/* Sort */}

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
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

                <button
                    onClick={onAdd}
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
                >

                    + Add Investment

                </button>

            </div>

        </div>

    );

};

export default InvestmentFilters;