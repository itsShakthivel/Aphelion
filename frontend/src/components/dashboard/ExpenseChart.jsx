import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
];

function ExpenseChart({ data }) {

    if (!data || !data.charts)
        return null;

    const expenseData =
        data.charts.expenseDistribution;

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-white text-xl font-semibold mb-6">

                Expense Distribution

            </h2>

            {expenseData.length === 0 ? (

                <div className="h-80 flex items-center justify-center text-slate-500">

                    No Expense Data

                </div>

            ) : (

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie

                            data={expenseData}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={110}

                            label

                        >

                            {expenseData.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={
                                        COLORS[
                                            index %
                                            COLORS.length
                                        ]
                                    }

                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            )}

        </div>

    );

}

export default ExpenseChart;