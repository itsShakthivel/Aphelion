import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { useSelector } from "react-redux";

const CashFlowChart = () => {

    const { cashFlow } = useSelector(
        (state) => state.analytics
    );

    if (!cashFlow.length) {

        return (

            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-6">

                    Cash Flow

                </h2>

                <div className="h-[350px] flex items-center justify-center text-gray-500">

                    No cash flow data available.

                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Cash Flow Analysis

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <AreaChart data={cashFlow}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${Number(value).toLocaleString("en-IN")}`
                        }
                    />

                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                    />

                    <Area
                        type="monotone"
                        dataKey="expense"
                        stackId="2"
                        stroke="#EF4444"
                        fill="#EF4444"
                    />

                    <Area
                        type="monotone"
                        dataKey="cashFlow"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

};

export default CashFlowChart;