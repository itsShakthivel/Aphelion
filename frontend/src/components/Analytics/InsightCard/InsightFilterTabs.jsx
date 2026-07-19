import { motion } from "framer-motion";

const FILTERS = [
    "all",
    "savings",
    "investment",
    "debt",
    "cashflow",
    "goals",
    "fire",
    "networth",
];

const InsightFilterTabs = ({
    activeFilter,
    setActiveFilter,
}) => {

    return (

        <div className="flex flex-wrap gap-3">

            {FILTERS.map((filter) => (

                <motion.button

                    key={filter}

                    whileTap={{ scale: 0.95 }}

                    whileHover={{ scale: 1.03 }}

                    onClick={() => setActiveFilter(filter)}

                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all

                    ${
                        activeFilter === filter

                            ? "bg-indigo-600 text-white"

                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}

                >

                    {filter === "all"

                        ? "All"

                        : filter.charAt(0).toUpperCase() +
                          filter.slice(1)}

                </motion.button>

            ))}

        </div>

    );

};

export default InsightFilterTabs;