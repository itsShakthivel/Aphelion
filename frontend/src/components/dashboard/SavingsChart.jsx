import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const data = [
    { name: "Mutual Funds", value: 45 },
    { name: "Stocks", value: 20 },
    { name: "Gold", value: 10 },
    { name: "Emergency", value: 15 },
    { name: "Cash", value: 10 }
];

const COLORS = [
    "#10B981",
    "#0EA5E9",
    "#EAB308",
    "#A855F7",
    "#F43F5E"
];

function SavingsChart() {

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
                Savings Allocation
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

export default SavingsChart;