import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { useSelector } from "react-redux";

const FamilyContributionTrend = () => {

    const {
        contributionTrend,
    } = useSelector(
        state => state.familyAnalytics
    );

    const data =
        contributionTrend.map(item => ({

            month:
                `${item._id.month}/${item._id.year}`,

            amount:
                item.total || 0,

        }));

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Contribution Trend

            </h2>

            {data.length === 0 ? (

                <div className="h-[300px] flex items-center justify-center text-gray-500">

                    No contribution data available.

                </div>

            ) : (

                <div className="h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart data={data}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={value =>
                                    `₹ ${Number(value).toLocaleString()}`
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="amount"
                                strokeWidth={3}
                                dot
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

};

export default FamilyContributionTrend;