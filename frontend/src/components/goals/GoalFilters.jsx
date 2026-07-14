const GoalFilters = ({
    search,
    setSearch,
    category,
    setCategory,
    onAdd,
}) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-4">

            <div className="flex flex-col lg:flex-row gap-4">

                <input
                    type="text"
                    placeholder="Search goals..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 border rounded-lg px-4 py-2"
                />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
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

                <button
                    onClick={onAdd}
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
                >

                    + Add Goal

                </button>

            </div>

        </div>

    );

};

export default GoalFilters;