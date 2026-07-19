import { motion } from "framer-motion";

import InsightPriorityBadge from "./InsightPriorityBadge";
import InsightCategoryIcon from "./InsightCategoryIcon";
import InsightRecommendation from "./InsightRecommedation";

const SCORE_COLORS = {

    positive: "text-emerald-400",

    neutral: "text-blue-400",

    negative: "text-red-400",

};

const InsightCard = ({ insight }) => {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            whileHover={{
                y: -4,
            }}

            transition={{
                duration: 0.25,
            }}

            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm"

        >

            <div className="flex items-start justify-between gap-5">

                <div className="flex items-start gap-4">

                    <InsightCategoryIcon
                        category={insight.category}
                    />

                    <div>

                        <InsightPriorityBadge
                            priority={insight.priority}
                        />

                        <h3 className="mt-3 text-lg font-semibold text-white">

                            {insight.title}

                        </h3>

                        <p className="mt-2 leading-relaxed text-zinc-400">

                            {insight.description}

                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-xs uppercase text-zinc-500">

                        Impact

                    </p>

                    <p
                        className={`mt-1 text-2xl font-bold ${SCORE_COLORS[insight.impact]}`}
                    >
                        {insight.score}
                    </p>

                </div>

            </div>

            <InsightRecommendation

                recommendation={insight.recommendation}

            />

        </motion.div>

    );

};

export default InsightCard;