import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { useSelector } from "react-redux";

const IncomeBarChart = () => {

    const { incomeAnalytics } = useSelector(
        (state) => state.analytics
    );

    if (!incomeAnalytics.length) {

        return (

            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-6">

                    Income Sources

                </h2>

                <div className="h-[350px] flex items-center justify-center text-gray-500">

                    No income data available.

                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Income Sources

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={incomeAnalytics}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="source"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${Number(value).toLocaleString("en-IN")}`
                        }
                    />

                    <Bar
                        dataKey="amount"
                        fill="#10B981"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default IncomeBarChart;