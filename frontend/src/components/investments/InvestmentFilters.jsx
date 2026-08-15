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

        <div className="finance-filter">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search investments..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-lg px-4 py-2 border"
                />


                {/* Type */}

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                    className="rounded-lg px-4 py-2 border"
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
                    className="rounded-lg px-4 py-2 border"
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


            {/* Add Button */}

            <div className="mt-4">

                <button
                    onClick={onAdd}
                    className="finance-add-button"
                >

                    + Add Investment

                </button>

            </div>

        </div>

    );

};

export default InvestmentFilters;