import { motion } from "framer-motion";
import AnimatedNumber from "../../ui/AnimatedNumber/AnimatedNumber";
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";

const getGradient = (status) => {
    switch (status) {
        case "success":
            return ["#10b981", "#06b6d4"];

        case "info":
            return ["#3b82f6", "#06b6d4"];

        case "warning":
            return ["#f59e0b", "#f97316"];

        case "danger":
            return ["#ef4444", "#f43f5e"];

        default:
            return ["#6366f1", "#8b5cf6"];
    }
};

const getBadgeClasses = (status) => {
    switch (status) {
        case "success":
            return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";

        case "info":
            return "bg-blue-500/15 text-blue-400 border border-blue-500/30";

        case "warning":
            return "bg-amber-500/15 text-amber-400 border border-amber-500/30";

        case "danger":
            return "bg-red-500/15 text-red-400 border border-red-500/30";

        default:
            return "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30";
    }
};

const HealthScoreRing = ({
    score,
    level,
    status,
}) => {

    const radius = 78;
    const stroke = 12;

    const normalizedRadius = radius - stroke;

    const circumference =
        normalizedRadius * 2 * Math.PI;

    const offset =
        circumference -
        (score / 100) * circumference;

    const [start, end] =
        getGradient(status);

    return (

        <motion.div
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.6,
            }}
            whileHover={{
                scale: 1.03,
            }}
            className="relative flex flex-col items-center"
        >

            {/* Background Glow */}

            <div
                className="absolute w-44 h-44 rounded-full blur-3xl opacity-20"
                style={{
                    background: start,
                }}
            />

            <svg
                width="190"
                height="190"
                className="relative"
            >

                <defs>

                    <linearGradient
                        id="healthGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >

                        <stop
                            offset="0%"
                            stopColor={start}
                        />

                        <stop
                            offset="100%"
                            stopColor={end}
                        />

                    </linearGradient>

                </defs>

                {/* Background */}

                <circle
                    stroke="#27272a"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx="95"
                    cy="95"
                />

                {/* Animated Progress */}

                <motion.circle
                    stroke="url(#healthGradient)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{
                        strokeDashoffset:
                            circumference,
                    }}
                    animate={{
                        strokeDashoffset:
                            offset,
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                    r={normalizedRadius}
                    cx="95"
                    cy="95"
                    style={{
                        transform:
                            "rotate(-90deg)",
                        transformOrigin:
                            "50% 50%",
                        filter:
                            "drop-shadow(0px 0px 10px rgba(255,255,255,.2))",
                    }}
                />

                {/* Score */}

                <foreignObject
                    x="45"
                    y="55"
                    width="100"
                    height="80"
                >

                    <div className="flex flex-col items-center">

                        <span className="text-5xl font-bold text-white">

                            <AnimatedNumber
                                value={score}
                            />

                        </span>

                        <span className="text-xs uppercase tracking-widest text-zinc-400">

                            Score

                        </span>

                    </div>

                </foreignObject>

            </svg>

            {/* Badge */}

            <span
                className={`mt-5 px-4 py-2 rounded-full text-sm font-semibold ${getBadgeClasses(
                    status
                )}`}
            >

                {level}

            </span>

            {/* Trend */}

            <div className="flex items-center gap-2 mt-4 text-emerald-400 text-sm">

                <FaArrowTrendUp />

                <span>

                    +4.2 this month

                </span>

            </div>

        </motion.div>

    );

};

export default HealthScoreRing;