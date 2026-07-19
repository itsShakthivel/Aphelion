import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import ChartCard from "../ui/ChartCard";

function NetWorthChart({ data }) {

    if (!data || !data.charts)
        return null;

    const netWorthData = data.charts.netWorthTrend || [];

    return (

        <ChartCard
            title="Net Worth Trend"
            subtitle="Growth of your assets over time"
            accent="primary"
        >

            {netWorthData.length === 0 ? (

                <div className="h-80 flex items-center justify-center text-slate-500">

                    No Net Worth Data

                </div>

            ) : (

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <AreaChart data={netWorthData}>

                        <defs>

                            <linearGradient
                                id="netWorthGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.05}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#netWorthGradient)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            )}

        </ChartCard>

    );

}

export default NetWorthChart;