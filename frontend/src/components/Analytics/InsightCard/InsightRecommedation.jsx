import { FaLightbulb } from "react-icons/fa";

const InsightRecommendation = ({ recommendation }) => {

    return (

        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

            <div className="flex items-start gap-3">

                <div className="mt-1 text-emerald-400">

                    <FaLightbulb />

                </div>

                <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">

                        Recommendation

                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">

                        {recommendation}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default InsightRecommendation;