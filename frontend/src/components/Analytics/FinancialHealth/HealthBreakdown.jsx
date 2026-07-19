import { motion } from "framer-motion";

import {
    FaPiggyBank,
    FaChartLine,
    FaShieldHalved,
    FaCreditCard,
    FaWallet,
    FaBullseye,
    FaMoneyBillWave,
    FaFire,
} from "react-icons/fa6";

const CONFIG = {

    savings: {
        label: "Savings",
        icon: FaPiggyBank,
        color: "from-emerald-500 to-green-400",
        badge: "bg-emerald-500/15 text-emerald-400",
    },

    investments: {
        label: "Investments",
        icon: FaChartLine,
        color: "from-blue-500 to-cyan-400",
        badge: "bg-blue-500/15 text-blue-400",
    },

    insurance: {
        label: "Insurance",
        icon: FaShieldHalved,
        color: "from-violet-500 to-fuchsia-500",
        badge: "bg-violet-500/15 text-violet-400",
    },

    debt: {
        label: "Debt",
        icon: FaCreditCard,
        color: "from-red-500 to-rose-500",
        badge: "bg-red-500/15 text-red-400",
    },

    emergency: {
        label: "Emergency",
        icon: FaWallet,
        color: "from-amber-500 to-orange-400",
        badge: "bg-amber-500/15 text-amber-400",
    },

    goals: {
        label: "Goals",
        icon: FaBullseye,
        color: "from-indigo-500 to-blue-500",
        badge: "bg-indigo-500/15 text-indigo-400",
    },

    cashflow: {
        label: "Cash Flow",
        icon: FaMoneyBillWave,
        color: "from-teal-500 to-emerald-500",
        badge: "bg-teal-500/15 text-teal-400",
    },

    fire: {
        label: "FIRE",
        icon: FaFire,
        color: "from-orange-500 to-red-500",
        badge: "bg-orange-500/15 text-orange-400",
    },

};

const HealthBreakdown = ({ breakdown }) => {

    return (

        <div className="space-y-6">

            {Object.entries(breakdown).map(

                ([key, value], index) => {

                    const item = CONFIG[key];

                    const Icon = item.icon;

                    const percentage =
                        Math.round(
                            (value.score / value.max) * 100
                        );

                    return (

                        <motion.div

                            key={key}

                            initial={{
                                opacity: 0,
                                x: 20,
                            }}

                            animate={{
                                opacity: 1,
                                x: 0,
                            }}

                            transition={{
                                delay: index * 0.08,
                            }}

                            whileHover={{
                                scale: 1.02,
                            }}

                            className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-4"

                        >

                            <div className="flex items-center justify-between mb-3">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">

                                        <Icon className="text-white text-lg" />

                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-white">

                                            {item.label}

                                        </h4>

                                        <p className="text-zinc-400 text-sm">

                                            {value.score} / {value.max}

                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.badge}`}
                                >

                                    {percentage}%

                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">

                                <motion.div

                                    initial={{
                                        width: 0,
                                    }}

                                    animate={{
                                        width: `${percentage}%`,
                                    }}

                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.08,
                                    }}

                                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}

                                />

                            </div>

                        </motion.div>

                    );

                }

            )}

        </div>

    );

};

export default HealthBreakdown;