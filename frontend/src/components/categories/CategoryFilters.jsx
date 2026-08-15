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

        <div className="finance-filter">

            {/* ==========================================
                Search
            ========================================== */}

            <div className="w-full">

                <input

                    type="text"

                    placeholder="Search category..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-2.5
                    "

                />

            </div>


            {/* ==========================================
                Type + Sort
            ========================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                {/* Type */}

                <select

                    value={type}

                    onChange={(e) =>
                        setType(e.target.value)
                    }

                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-2.5
                    "

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


                {/* Sort */}

                <select

                    value={sortBy}

                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }

                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-2.5
                    "

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

            </div>


            {/* ==========================================
                Add Category
            ========================================== */}

            <div className="mt-4">

                <button

                    onClick={onAdd}

                    className="
                        finance-add-button
                    "

                >

                    + Add Category

                </button>

            </div>

        </div>

    );

};


export default CategoryFilters;