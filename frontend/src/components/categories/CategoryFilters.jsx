const CategoryFilters = ({
    search,
    setSearch,
    type,
    setType,
}) => {

    const tabs = [
        {
            label: "All",
            value: "",
        },
        {
            label: "Expense",
            value: "expense",
        },
        {
            label: "Income",
            value: "income",
        },
        {
            label: "Investment",
            value: "investment",
        },
        {
            label: "Saving",
            value: "saving",
        },
    ];

    return (

        <div className="space-y-5">

            <div className="w-full lg:max-w-md">

                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full bg-[#0f1b2d] border border-blue-900/40 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 outline-none focus:border-blue-500/60 transition-colors"
                />

            </div>

            <div className="flex flex-wrap gap-2">

                {tabs.map((tab) => (

                    <button
                        key={tab.value}
                        onClick={() =>
                            setType(tab.value)
                        }
                        className={`px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                            type === tab.value
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                                : "bg-[#0f1b2d] border-blue-900/40 text-slate-400 hover:bg-[#172b46] hover:text-white"
                        }`}
                    >
                        {tab.label}
                    </button>

                ))}

            </div>

        </div>

    );

};

export default CategoryFilters;