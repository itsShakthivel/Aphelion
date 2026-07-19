import TrendIndicator from "./TrendIndicator";

const SummaryMetricCard = ({

    title,

    value,

    trend,

}) => {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">

            <div className="flex items-center justify-between">

                <h4 className="text-sm text-zinc-400">

                    {title}

                </h4>

                <TrendIndicator value={trend} />

            </div>

            <h3 className="mt-3 text-2xl font-bold text-white">

                ₹{value.toLocaleString()}

            </h3>

        </div>

    );

};

export default SummaryMetricCard;