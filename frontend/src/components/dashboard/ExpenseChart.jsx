import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const data = [
    { name: "Food", value: 12000 },
    { name: "Rent", value: 15000 },
    { name: "Travel", value: 5000 },
    { name: "Shopping", value: 7000 },
    { name: "Bills", value: 3000 }
];

const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6"
];

function ExpenseChart() {

    return (
        <div
            className="
                bg-slate-900
                rounded-2xl
                p-6
                border
                border-slate-800
            "
        >

            <h2
                className="
                    text-white
                    text-xl
                    font-semibold
                    mb-6
                "
            >
                Expense Distribution
            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            dataKey="value"
                        >

                            {data.map((entry, index) => (
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

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default ExpenseChart;