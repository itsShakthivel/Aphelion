import {
    FaUniversity,
    FaShieldAlt,
    FaBullseye,
    FaPercentage,
} from "react-icons/fa";
import { motion } from "framer-motion";

function DashboardWidgets({ data }) {

    if (!data) return null;

    const metrics = data.financialMetrics;
    const goals = data.goals;

    const widgets = [

        {
            title: "Monthly EMI",
            value: `₹${metrics.monthlyEMI.toLocaleString()}`,
            icon: <FaUniversity />,
            color: "text-red-400",
        },

        {
            title: "Insurance Coverage",
            value: `₹${metrics.insuranceCoverage.toLocaleString()}`,
            icon: <FaShieldAlt />,
            color: "text-green-400",
        },

        {
            title: "Goals Completed",
            value: `${goals.completed} / ${goals.total}`,
            icon: <FaBullseye />,
            color: "text-blue-400",
        },

        {
            title: "Debt to Income",
            value: `${metrics.debtToIncomeRatio.toFixed(1)}%`,
            icon: <FaPercentage />,
            color: "text-yellow-400",
        },

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mt-6">

            {widgets.map((widget) => (

                <motion.div
                    key={widget.title}
                    whileHover={{
                        y: -5,
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    className="bg-slate-900 rounded-2xl border border-slate-800 p-6"
                >

                    <div className="flex justify-between items-center">

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
                            className={`text-3xl ${widget.color}`}
                        >

                            {widget.icon}

                        </div>

                    </div>

                </motion.div>

            ))}

        </div>

    );

}

export default DashboardWidgets;