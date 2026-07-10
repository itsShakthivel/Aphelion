import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";

const TransactionFilters = ({
    search,
    setSearch,
    type,
    setType,
    category,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy,
    categories,
    onAdd,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* Search */}

                <div className="relative">

                    <FaMagnifyingGlass
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Type */}

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                {/* Category */}

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">
                        All Categories
                    </option>

                    {categories.map((cat) => (
                        <option
                            key={cat._id}
                            value={cat._id}
                        >
                            {cat.name}
                        </option>
                    ))}

                </select>

                {/* Placeholder */}

                <div />

                {/* Start Date */}

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-1g px-3 py-2"
                />

                {/* End Date */}

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-1g px-3 py-2"
                />
                
                {/* Sort */}

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-1g px-3 py-2"
                >
                    <option value="latest">
                        Newest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                    <option value="highest">
                        Highest Amount
                    </option>

                    <option value="lowest">
                        Lowest Amount
                    </option>
                </select>

                {/* Add Button */}

                <button
                    onClick={onAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                >
                    <FaPlus />

                    Add Transaction

                </button>

            </div>

        </div>
    );
};

export default TransactionFilters;