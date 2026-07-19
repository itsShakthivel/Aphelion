import {
    FaUniversity,
    FaShieldAlt,
    FaBullseye,
    FaPercentage,
} from "react-icons/fa";

import { motion } from "framer-motion";

import Card from "../ui/Card";
import { formatNumber } from "../../utils/formatNumber";

function DashboardWidgets({
    data,
    currency = "INR",
    locale = "en-IN",
}) {

    if (!data) return null;

    const metrics = data.financialMetrics || {};
    const goals = data.goals || {};

    const widgets = [

        {
            title: "Monthly EMI",
            value: formatNumber(
                metrics.monthlyEMI || 0,
                {
                    currency,
                    locale,
                }
            ),
            icon: FaUniversity,
            accent: "danger",
            color: "text-red-400",
        },

        {
            title: "Insurance Coverage",
            value: formatNumber(
                metrics.insuranceCoverage || 0,
                {
                    currency,
                    locale,
                }
            ),
            icon: FaShieldAlt,
            accent: "success",
            color: "text-emerald-400",
        },

        {
            title: "Goals Completed",
            value: `${goals.completed || 0} / ${goals.total || 0}`,
            icon: FaBullseye,
            accent: "primary",
            color: "text-blue-400",
        },

        {
            title: "Debt To Income",
            value: `${(
                metrics.debtToIncomeRatio || 0
            ).toFixed(1)}%`,
            icon: FaPercentage,
            accent: "warning",
            color: "text-yellow-400",
        },

    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                2xl:grid-cols-4
                gap-6
                mt-6
            "
        >

            {widgets.map((widget) => {

                const Icon = widget.icon;

                return (

                    <motion.div
                        key={widget.title}
                        whileHover={{
                            y: -4,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                    >

                        <Card accent={widget.accent}>

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-slate-400 text-sm">

                                        {widget.title}

                                    </p>

                                    <h2
                                        className={`text-2xl font-bold mt-3 ${widget.color}`}
                                    >

                                        {widget.value}

                                    </h2>

                                </div>

                                <div
                                    className={`
                                        icon-box
                                        ${widget.color}
                                    `}
                                >

                                    <Icon size={22} />

                                </div>

                            </div>

                        </Card>

                    </motion.div>

                );

            })}

        </div>

    );

}

export default DashboardWidgets;