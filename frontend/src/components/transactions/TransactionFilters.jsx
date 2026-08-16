import {
    FaMagnifyingGlass,
} from "react-icons/fa6";

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
}) => {

    return (

        <div className="finance-filter">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="relative">

                    <FaMagnifyingGlass
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none"
                    />

                </div>

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                >

                    <option value="">
                        All Types
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>

                </select>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
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

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
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

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                        setStartDate(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                        setEndDate(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                />

            </div>

        </div>

    );

};

export default TransactionFilters;