import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useSelector } from "react-redux";

const MonthlyExpenseTrend = () => {

    const { monthlyExpenseTrend } =
        useSelector((state) => state.analytics);

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Monthly Expense Trend

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={monthlyExpenseTrend}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${Number(value).toLocaleString("en-IN")}`
                        }
                    />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#2563EB"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default MonthlyExpenseTrend;