import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { useSelector } from "react-redux";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
    "#14B8A6",
];

const ExpensePieChart = () => {

    const { expenseAnalytics } = useSelector(
        (state) => state.analytics
    );

    if (!expenseAnalytics.length) {

        return (

            <div className="bg-white rounded-xl shadow-md p-8">

                <h2 className="text-xl font-semibold mb-6">
                    Expense Distribution
                </h2>

                <div className="h-[350px] flex items-center justify-center text-gray-500">

                    No expense data available.

                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Expense Distribution

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={expenseAnalytics}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >

                        {expenseAnalytics.map((entry, index) => (

                            <Cell
                                key={entry.category}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip
                        formatter={(value) =>
                            `₹ ${Number(value).toLocaleString("en-IN")}`
                        }
                    />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default ExpensePieChart;