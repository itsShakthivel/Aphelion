import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import ChartCard from "../ui/ChartCard";

const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#ec4899",
];

function SavingsChart({ data }) {

    if (!data || !data.charts)
        return null;

    const investmentData =
        data.charts.investmentAllocation;

    return (

        <ChartCard
            title="Investment Allocation"
            subtitle="Portfolio distribution"
            accent="info"
        >

            {investmentData.length === 0 ? (

                <div className="h-80 flex items-center justify-center text-slate-500">

                    No Investment Data

                </div>

            ) : (

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie
                            data={investmentData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {investmentData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
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

        </ChartCard>

    );

}

export default SavingsChart;