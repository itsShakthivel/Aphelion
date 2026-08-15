const GoalFilters = ({
    search,
    setSearch,
    category,
    setCategory,
    onAdd,
}) => {

    return (

        <div className="finance-filter">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search goals..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-lg px-4 py-2 border"
                />


                {/* Category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="rounded-lg px-4 py-2 border"
                >

                    <option value="">
                        All Categories
                    </option>

                    <option value="emergency">
                        Emergency
                    </option>

                    <option value="house">
                        House
                    </option>

                    <option value="car">
                        Car
                    </option>

                    <option value="vacation">
                        Vacation
                    </option>

                    <option value="education">
                        Education
                    </option>

                    <option value="retirement">
                        Retirement
                    </option>

                    <option value="investment">
                        Investment
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>


            {/* Add Button */}

            <div className="mt-4">

                <button
                    onClick={onAdd}
                    className="finance-add-button"
                >

                    + Add Goal

                </button>

            </div>

        </div>

    );

};

export default GoalFilters;