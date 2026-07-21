import { formatCurrency } from "../../utils/formatCurrency";

const FireTimelineTooltip = ({ active, payload }) => {

    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    return (

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg">

            <p className="font-semibold text-white">
                Age {data.age}
            </p>

            <p className="text-sm text-zinc-400">
                Year {data.year}
            </p>

            <div className="mt-3 space-y-2 text-sm">

                <p className="text-green-400">
                    Wealth: {formatCurrency(data.wealth)}
                </p>

                <p className="text-orange-400">
                    Progress: {data.progress}%
                </p>

                <p className="text-red-400">
                    Remaining: {formatCurrency(data.remaining)}
                </p>

            </div>

        </div>

    );

};

export default FireTimelineTooltip;