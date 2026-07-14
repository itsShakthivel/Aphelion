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

        <div className="bg-white rounded-xl shadow-md p-4">

            <div className="flex flex-col lg:flex-row gap-4">

                <input
                    type="text"
                    placeholder="Search loans..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 border rounded-lg px-4 py-2"
                />

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
                >

                    <option value="">All Types</option>
                    <option value="home">Home</option>
                    <option value="personal">Personal</option>
                    <option value="education">Education</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="gold">Gold</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="other">Other</option>

                </select>

                <input
                    type="text"
                    placeholder="Lender"
                    value={lender}
                    onChange={(e) =>
                        setLender(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
                />

                <button
                    onClick={onAdd}
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
                >

                    + Add Loan

                </button>

            </div>

        </div>

    );

};

export default LoanFilters;