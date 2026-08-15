const LoanFilters = ({
    search,
    setSearch,
    type,
    setType,
    lender,
    setLender,
    onAdd,
}) => {

    return (

        <div className="finance-filter">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search loans..."
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

                    <option value="home">
                        Home
                    </option>

                    <option value="personal">
                        Personal
                    </option>

                    <option value="education">
                        Education
                    </option>

                    <option value="vehicle">
                        Vehicle
                    </option>

                    <option value="gold">
                        Gold
                    </option>

                    <option value="credit_card">
                        Credit Card
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>


                {/* Lender */}

                <input
                    type="text"
                    placeholder="Lender"
                    value={lender}
                    onChange={(e) =>
                        setLender(e.target.value)
                    }
                    className="rounded-lg px-4 py-2 border"
                />

            </div>


            {/* Add Button */}

            <div className="mt-4">

                <button
                    onClick={onAdd}
                    className="finance-add-button"
                >

                    + Add Loan

                </button>

            </div>

        </div>

    );

};

export default LoanFilters;