import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const data = [
    { month: "Jan", worth: 100000 },
    { month: "Feb", worth: 120000 },
    { month: "Mar", worth: 145000 },
    { month: "Apr", worth: 180000 },
    { month: "May", worth: 210000 },
    { month: "Jun", worth: 250000 }
];

function NetWorthChart() {

    return (
        <div
            className="
                bg-slate-900
                rounded-2xl
                p-6
                border
                border-slate-800
                mt-6
            "
        >

            <div className="mb-6">

                <h2
                    className="
                        text-white
                        text-xl
                        font-semibold
                    "
                >
                    Net Worth Growth
                </h2>

                <p className="text-slate-400">
                    Last 6 Months
                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            stroke="#1e293b"
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="worth"
                            stroke="#10B981"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default NetWorthChart;