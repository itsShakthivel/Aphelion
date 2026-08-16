const InsuranceFilters = ({
    search,
    setSearch,
    type,
    setType,
    status,
    setStatus,
}) => {

    return (

        <div className="finance-filter">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                    type="text"
                    placeholder="Search insurance..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-lg px-4 py-2 border"
                />

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

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="rounded-lg px-4 py-2 border"
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

            </div>

        </div>

    );

};

export default InsuranceFilters;