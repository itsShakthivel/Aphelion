import { motion } from "framer-motion";

const FireProgressRing = ({ progress }) => {

    const radius = 80;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (Math.min(progress, 100) / 100) * circumference;

    return (

        <div className="flex justify-center">

            <div className="relative">

                <svg width="190" height="190">

                    <circle
                        cx="95"
                        cy="95"
                        r={radius}
                        stroke="#27272a"
                        strokeWidth="12"
                        fill="transparent"
                    />

                    <motion.circle
                        cx="95"
                        cy="95"
                        r={radius}
                        stroke="#f97316"
                        strokeWidth="12"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{
                            strokeDashoffset: circumference,
                        }}
                        animate={{
                            strokeDashoffset: offset,
                        }}
                        transition={{
                            duration: 1.2,
                        }}
                        transform="rotate(-90 95 95)"
                    />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <h2 className="text-4xl font-bold text-white">

                        {progress.toFixed(1)}%

                    </h2>

                    <p className="text-zinc-400">

                        Complete

                    </p>

                </div>

            </div>

        </div>

    );

};

export default FireProgressRing;