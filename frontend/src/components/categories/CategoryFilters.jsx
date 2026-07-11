const CategoryFilters = ({
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

                    placeholder="Search category..."

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

                    <option value="expense">
                        Expense
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="investment">
                        Investment
                    </option>

                    <option value="saving">
                        Saving
                    </option>

                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="nameAsc">
                        Name (A-Z)
                    </option>

                    <option value="nameDesc">
                        Name (Z-A)
                    </option>

                    <option value="type">
                        Type
                    </option>

                    <option value="latest">
                        Recently Created
                    </option>
                    
                </select>

                {/* Button */}

                <button

                    onClick={onAdd}

                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg"

                >

                    + Add Category

                </button>

            </div>

        </div>

    );

};

export default CategoryFilters;