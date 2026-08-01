const RecommendationFilters = ({
    category,
    setCategory,
    priority,
    setPriority,
    search,
    setSearch,
    sort,
    setSort,
    resetFilters,
}) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

            <div className="grid lg:grid-cols-5 gap-4">

                <input
                    type="text"
                    placeholder="Search recommendations..."
                    className="border rounded-lg p-3"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    className="border rounded-lg p-3"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option>All</option>

                    <option>Savings</option>

                    <option>Investment</option>

                    <option>Debt</option>

                    <option>Insurance</option>

                    <option>Goals</option>

                    <option>Expenses</option>

                    <option>FIRE</option>

                </select>

                <select
                    className="border rounded-lg p-3"
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                >

                    <option>All</option>

                    <option>Critical</option>

                    <option>High</option>

                    <option>Medium</option>

                    <option>Low</option>

                    <option>Positive</option>

                </select>

                <select
                    className="border rounded-lg p-3"
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                >

                    <option value="priority">
                        Priority
                    </option>

                    <option value="title">
                        Title
                    </option>

                    <option value="savings">
                        Estimated Savings
                    </option>

                </select>

                <button
                    onClick={resetFilters}
                    className="bg-red-500 text-white rounded-lg px-4 py-3 hover:bg-red-600 transition"
                >

                    Reset Filters

                </button>

            </div>

        </div>

    );

};

export default RecommendationFilters;