import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { useSelector } from "react-redux";

const NetWorthTimeline = () => {

    const { netWorthTimeline } = useSelector(
        (state) => state.analytics
    );

    if (!netWorthTimeline.length) {

        return (

            <div className="bg-white rounded-2xl shadow-xl p-6">

                <h2 className="text-xl font-semibold mb-6">

                    Net Worth Timeline

                </h2>

                <div className="h-[350px] flex items-center justify-center text-gray-500">

                    No timeline data available.

                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Net Worth Timeline

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={netWorthTimeline}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${Number(value).toLocaleString("en-IN")}`
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="netWorth"
                        stroke="#2563EB"
                        strokeWidth={4}
                        dot={{ r: 5 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default NetWorthTimeline;