const InsuranceFilters = ({
    search,
    setSearch,
    type,
    setType,
    status,
    setStatus,
    onAdd,
}) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-4">

            <div className="flex flex-col lg:flex-row gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search policy..."
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

                    <option value="health">
                        Health
                    </option>

                    <option value="term">
                        Term
                    </option>

                    <option value="vehicle">
                        Vehicle
                    </option>

                    <option value="home">
                        Home
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

                {/* Status */}

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="active">
                        Active
                    </option>

                    <option value="expiring">
                        Expiring Soon
                    </option>

                    <option value="expired">
                        Expired
                    </option>

                </select>

                <button
                    onClick={onAdd}
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
                >
                    + Add Insurance
                </button>

            </div>

        </div>

    );

};

export default InsuranceFilters;