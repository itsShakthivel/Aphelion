import { motion } from "framer-motion";

import {
    FaCircleCheck,
    FaTriangleExclamation,
    FaCircleInfo,
    FaFire,
    FaArrowTrendUp,
} from "react-icons/fa6";

const buildInsights = (data) => {

    const insights = [];

    if (data.breakdown.savings.score < 12) {

        insights.push({

            priority: "warning",

            title: "Increase Your Savings",

            description:
                "Your monthly savings rate is below the recommended level.",

            recommendation:
                "Aim to save at least 20% of your monthly income.",

            icon: FaArrowTrendUp,

        });

    }

    if (data.breakdown.debt.score < 10) {

        insights.push({

            priority: "danger",

            title: "Debt Needs Attention",

            description:
                "Your debt burden is reducing your financial flexibility.",

            recommendation:
                "Prioritize paying high-interest loans first.",

            icon: FaTriangleExclamation,

        });

    }

    if (data.breakdown.emergency.score < 8) {

        insights.push({

            priority: "warning",

            title: "Emergency Fund",

            description:
                "Your emergency reserve should cover at least 6 months of expenses.",

            recommendation:
                "Increase emergency savings before making risky investments.",

            icon: FaCircleInfo,

        });

    }

    if (data.breakdown.investments.score >= 15) {

        insights.push({

            priority: "success",

            title: "Investments Looking Strong",

            description:
                "Your investment allocation is well balanced.",

            recommendation:
                "Continue your SIPs and avoid unnecessary withdrawals.",

            icon: FaCircleCheck,

        });

    }

    if (data.breakdown.fire.score >= 4) {

        insights.push({

            priority: "fire",

            title: "FIRE Progress",

            description:
                "You are progressing steadily toward financial independence.",

            recommendation:
                "Maintain consistent investing and increase income whenever possible.",

            icon: FaFire,

        });

    }

    return insights;

};

const styles = {

    success: {

        border: "border-emerald-500/30",

        bg: "bg-emerald-500/10",

        text: "text-emerald-400",

    },

    warning: {

        border: "border-amber-500/30",

        bg: "bg-amber-500/10",

        text: "text-amber-400",

    },

    danger: {

        border: "border-red-500/30",

        bg: "bg-red-500/10",

        text: "text-red-400",

    },

    fire: {

        border: "border-orange-500/30",

        bg: "bg-orange-500/10",

        text: "text-orange-400",

    },

};

const HealthInsights = ({ data }) => {

    const insights = buildInsights(data);

    return (

        <div className="space-y-5">

            <h3 className="text-xl font-semibold text-white">

                Smart Financial Coach

            </h3>

            {

                insights.map((item, index) => {

                    const Icon = item.icon;

                    const style = styles[item.priority];

                    return (

                        <motion.div

                            key={index}

                            initial={{

                                opacity: 0,

                                y: 15,

                            }}

                            animate={{

                                opacity: 1,

                                y: 0,

                            }}

                            transition={{

                                delay: index * 0.08,

                            }}

                            whileHover={{

                                scale: 1.01,

                            }}

                            className={`rounded-2xl border p-5 ${style.border} ${style.bg}`}

                        >

                            <div className="flex items-start gap-4">

                                <div className={`text-2xl ${style.text}`}>

                                    <Icon />

                                </div>

                                <div className="flex-1">

                                    <h4 className={`font-semibold ${style.text}`}>

                                        {item.title}

                                    </h4>

                                    <p className="text-zinc-300 mt-2">

                                        {item.description}

                                    </p>

                                    <div className="mt-4 rounded-xl bg-black/20 p-3">

                                        <p className="text-sm text-zinc-400 uppercase">

                                            Recommendation

                                        </p>

                                        <p className="text-white mt-1">

                                            {item.recommendation}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    );

                })

            }

        </div>

    );

};

export default HealthInsights;